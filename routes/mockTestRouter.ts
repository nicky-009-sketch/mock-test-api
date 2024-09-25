import express, { Request, Response } from 'express';
import { ValidationHelper } from '../helpers/validationHelper';
import { mockTestModel } from '../models/mockTestModel';
const mockTestRouter = express.Router();
const vh = ValidationHelper.singleton;
const mtModel = new mockTestModel();

mockTestRouter.post('/exam-tests', async (req: Request, res: Response) => {
 try {
  const validationResult = vh.examMockTestPostRequest(req.body, 'body')
  if (validationResult.invalid) {
   const reason = validationResult.reason[0];
   return res.status(417).json({ status: "Validationfailedure", message: reason });
  }
  const { examId } = req.body
  const mockRes = await mtModel.list(examId)
  res.status(200).json({ status: "success", data: mockRes });
 } catch (error) {
  console.log(error)
  console.log('error', error)
  return res.status(500).json({ status: "failed", "message": "something went wrong" });
 }
})


export { mockTestRouter }