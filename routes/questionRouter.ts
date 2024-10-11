import express, { Request, Response } from 'express';
import { ValidationHelper } from '../helpers/validationHelper';
import { questionModel } from '../models/questionModel';
const questionRouter = express.Router();
const vh = ValidationHelper.singleton;
const qesModel = new questionModel();

questionRouter.post('/test-questions', async (req: Request, res: Response) => {
 try {
  const validationResult = vh.testQuestionsPostRequest(req.body, 'body')
  if (validationResult.invalid) {
   const reason = validationResult.reason[0];
   return res.status(417).json({ status: "Validationfailedure", message: reason });
  }
  const {testId} = validationResult?.data
  const questionRes = await qesModel.list(testId)
  res.status(200).json({ status: "success", data: questionRes });
 } catch (error) {
  console.log(error)
  console.log('error', error)
  return res.status(500).json({ status: "failed", "message": "something went wrong" });
 }
})


export { questionRouter }