import * as dotenv from 'dotenv'
dotenv.config();

const config = {
  port: process.env.PORT || 9721,
}

export default config