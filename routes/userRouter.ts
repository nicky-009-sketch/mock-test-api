import express, { Request, Response } from 'express';
import { userModel } from '../models/userModel';
import { ValidationHelper } from '../helpers/validationHelper';
const userRouter = express.Router();
const uModel = new userModel();
const vh = ValidationHelper.singleton;

userRouter.post('/register', async (req: Request, res: Response) => {
 try {
  const validationResult = vh.userRegisterPostRequest(req.body, 'body')
  if (validationResult.invalid) {
   const reason = validationResult.reason[0];
   return res.status(417).json({ status: "Validationfailedure", message: reason });
  } 
  const {email, name} = req.body
  const response = await uModel.findOne(email)
  return res.status(200).json({ status: "success", response:response, message: "Record inserted successfully." });
 } catch (error:any) {
  console.log('error', error)
  return res.status(500).json({ status: "failed", "message": "something went wrong" });
 }
})


export { userRouter }