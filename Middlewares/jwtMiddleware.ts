import { NextFunction, Request, Response } from 'express';
import config from '../config';
const jwt = require('jsonwebtoken');

const autherize = (req:Request, res:Response, next:NextFunction) => {
 try {
  const token = req.headers.authorization!.split(" ")[1]
  const decode = jwt.verify(token, config.jwt.secret)
  req.body.user = decode
  next();
 } catch (error) {
  res.status(401).send({message:'Invalid request!'})
 }
}

export {autherize}