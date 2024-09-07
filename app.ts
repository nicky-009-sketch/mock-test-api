import express from "express";
import config from './config';
import { userRouter } from './routes/userRouter';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/nodeapi/user', userRouter);

app.listen(config.port, () => {
  console.log(`Node server started running on port: ${config.port}`)
})
