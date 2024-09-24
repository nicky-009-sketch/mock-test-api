import express, { Request, Response } from 'express';
import { examModel } from '../models/examModel';
const examRouter = express.Router();
const eModel = new examModel();

examRouter.get('/', async (req: Request, res: Response) => {
 try {
  const examRes = await eModel.findAll();
  res.status(200).json({ status: "success", data:examRes });
 } catch (error) {
  console.log(error)
  console.log('error', error)
  return res.status(500).json({ status: "failed", "message": "something went wrong" });
 }
})


export { examRouter }