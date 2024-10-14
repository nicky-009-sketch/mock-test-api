import express, { Request, Response } from 'express';
import { ValidationHelper } from '../helpers/validationHelper';
import { mockTestModel } from '../models/mockTestModel';
import { instructionModel } from '../models/instructionModel';
import { submissionModel } from '../models/submissionModel';
import { questionModel } from '../models/questionModel';
const mockTestRouter = express.Router();
const vh = ValidationHelper.singleton;
const mtModel = new mockTestModel();
const insModel = new instructionModel();
const smModel = new submissionModel();
const quesModel = new questionModel();

mockTestRouter.post('/exam-tests', async (req: Request, res: Response) => {
 try {
  const validationResult = vh.examMockTestPostRequest(req.body, 'body')
  if (validationResult.invalid) {
   const reason = validationResult.reason[0];
   return res.status(417).json({ status: "Validationfailedure", message: reason });
  }
  const { examId } = req.body
  const mockTestRes = await mtModel.list(examId)
  const updateMockTests = mockTestRes?.map(async (test: any) => {
   const [instructionRes] = await insModel.findById(test.instruction_id) ?? []
   const instructionText = instructionRes?.instruction_text
   return { ...test, instructionText }
  })
  const mockTests = await Promise.all([...updateMockTests || []])
  res.status(200).json({ status: "success", data: mockTests });
 } catch (error) {
  console.log(error)
  console.log('error', error)
  return res.status(500).json({ status: "failed", "message": "something went wrong" });
 }
})

mockTestRouter.post('/submission', async (req: Request, res: Response) => {
 try {
  //pending to wrrite schema validation.
  const { user_id, test_id, attempted, unattempted } = req.body
  const existingResponse = await smModel.findExist(user_id, test_id)
  if (!existingResponse) {
   const submissionRes = await smModel.saveResponse(user_id, test_id, attempted, unattempted);
   console.log('Saved response:', submissionRes);
   return res.status(200).json({ status: "success", data: submissionRes });
  } else {
   console.log('Duplicate entry detected');
   return res.status(409).json({ status: "failed", message: 'Duplicate entry: User ID and Test ID combination already exists. No new entry created.' });
  }
 } catch (error) {
  console.log(error)
  console.log('error', error)
  return res.status(500).json({ status: "failed", "message": "something went wrong" });
 }
})

mockTestRouter.post('/evaluate', async (req: Request, res: Response) => {
 try {
  //pending to write schmea validation. and also remove type 'any', give proper data type.
  const { userId, testId } = req.body
  const questionRes: any = await quesModel.list(testId)
  const submittedRes: any = await smModel.findExist(userId, testId)
  const { attempted } = submittedRes;
  const results = questionRes.map((question:any) => {
   const userResponseItem = attempted.find((a:any)=> a.questionId === question.id);
   return {
    questionId: question.id,
    questionText: question.questionText,
    correctAnswer: question.correctAnswer,
    userAnswer: userResponseItem ? userResponseItem.optionId : null,
    isCorrect: userResponseItem ? userResponseItem.optionId === question.correctAnswer : false,
   };
  });
  res.status(200).json({ status: "success", data: results });
 } catch (error) {
  console.log(error)
  console.log('error', error)
  return res.status(500).json({ status: "failed", "message": "something went wrong" });
 }
})


export { mockTestRouter }