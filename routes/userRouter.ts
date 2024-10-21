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
  const { email } = req.body
  const user:any = await uModel.findOne(email)
  const generateOpt = () => Math.floor(100000 + Math.random() * 900000);
  var otp = generateOpt();
  var mailOptions = { to: email, subject: 'Mock test Otp', text: `${otp}` };

  if (user?.otp !== 0) {
   otp = user?.otp;
   await mailer(mailOptions)
   return res.status(200).json({ status: "success", message: "Otp send to your email." });
  }
  if (user) {
   const _id = user._id;
   await uModel.updateOtp(_id, otp)
   await mailer(mailOptions)
  }
  if (!user) {
   await uModel.createOne(email, otp)
   await mailer(mailOptions)
  }
  return res.status(200).json({ status: "success", message: "Otp send to your email." });
 } catch (error: any) {
  console.log('error', error)
  return res.status(500).json({ status: "failed", "message": "something went wrong" });
 }
})

userRouter.post('/login', async (req: Request, res: Response) => {
 try {
  const validationResult = vh.userLoginPostRequest(req.body, 'body')
  if (validationResult.invalid) {
   const reason = validationResult.reason[0];
   return res.status(417).json({ status: "Validationfailedure", message: reason });
  }
  const { email, otp } = req.body
  const loginRes: any = await uModel.login(email, otp)
  if (loginRes) {
   const token = jwt.sign({ _id: loginRes?._id, email: loginRes?.email, otp: loginRes?.otp }, config.jwt.secret)
   await uModel.updateOtp(loginRes?._id, 0)
   return res.status(200).json({ status: "success", message: 'login successfully', token: token });
  } else {
   return res.status(417).json({ status: "falied", message: 'Invalid otp.' });
  }
 } catch (error) {
  console.log('error', error)
  return res.status(500).json({ status: "failed", "message": "something went wrong" });
 }
})


export { userRouter }