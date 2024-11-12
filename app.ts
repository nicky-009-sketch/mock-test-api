import express from "express";
import config from './config';
import { userRouter } from './routes/userRouter';
import { examRouter } from "./routes/examRouter";
import cors from "cors";
import { mockTestRouter } from "./routes/mockTestRouter";
import { questionRouter } from "./routes/questionRouter";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())
app.set('trust proxy', true)

app.use('/nodeapi/user', userRouter);
app.use('/nodeapi/exam', examRouter);
app.use('/nodeapi/mock', mockTestRouter);
app.use('/nodeapi/question', questionRouter);



app.listen(config.port, () => {
  console.log(`Node server started running on port: ${config.port}`)
})







































































// const app = express();
// dotenv.config();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// // adding Helmet to enhance your Rest API's security
// app.use(helmet());

// // using bodyParser to parse JSON bodies into JS objects
// app.use(bodyParser.json());

// // enabling CORS for all requests
// app.use(cors());
// app.set('trust proxy', true)
// // adding morgan to log HTTP requests
// app.use(morgan('combined'));