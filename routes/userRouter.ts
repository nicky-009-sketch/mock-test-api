import express, { Request, Response } from 'express';
import { userModel } from '../models/userModel';
import { ValidationHelper } from '../helpers/validationHelper';
import { mailer } from '../services/mailer';
const userRouter = express.Router();
const uModel = new userModel();
const vh = ValidationHelper.singleton;

userRouter.post('/generate-otp', async (req: Request, res: Response) => {
 try {
  const validationResult = vh.userGenerateOtpPostRequest(req.body, 'body')
  if (validationResult.invalid) {
   const reason = validationResult.reason[0];
   return res.status(417).json({ status: "Validationfailedure", message: reason });
  } 
  const {email} = req.body
  const user:any = await uModel.findOne(email)
  const otp = 1234;
  var mailOptions = {to: email, subject: 'Mock test Otp', text: `${otp}`};
  if(user){
   const _id = user._id;
   await mailer(mailOptions)
   await uModel.updateOtp(_id, otp)
  }
  if(!user){
   await mailer(mailOptions)
   await uModel.createOne(email, otp)
  }
  return res.status(200).json({ status: "success", message: "Otp send to your email." });
 } catch (error:any) {
  console.log('error', error)
  return res.status(500).json({ status: "failed", "message": "something went wrong" });
 }
})


export { userRouter }