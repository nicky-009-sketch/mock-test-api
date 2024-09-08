import express, { Request, Response } from 'express';
import { userModel } from '../models/userModel';
import { ValidationHelper } from '../helpers/validationHelper';
import { mailer } from '../services/mailer';
import config from '../config';
import { autherize } from '../Middlewares/jwtMiddleware';
const userRouter = express.Router();
const uModel = new userModel();
const vh = ValidationHelper.singleton;
const jwt = require('jsonwebtoken');

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

userRouter.post('/login', async (req:Request, res:Response)=>{
 try {
  const validationResult = vh.userLoginPostRequest(req.body, 'body')
  if (validationResult.invalid) {
   const reason = validationResult.reason[0];
   return res.status(417).json({ status: "Validationfailedure", message: reason });
  } 
  const {email, otp} = req.body
  const loginRes:any = await uModel.login(email, otp)
  if(loginRes){
   const token = jwt.sign({_id:loginRes?._id, email:loginRes?.email, otp:loginRes?.otp}, config.jwt.secret)
   return res.status(200).json({ status: "success", message: 'login successfully', token:token });
  }else{
   return res.status(417).json({ status: "falied", message: 'Invalid otp.' });
  }
 } catch (error) {
  console.log('error', error)
  return res.status(500).json({ status: "failed", "message": "something went wrong" });
 }
})


export { userRouter }