import * as dotenv from 'dotenv'
dotenv.config();

const config = {
  port: process.env.PORT || 9721,
  jwt: {
    secret: process.env.JWT_SECRET || '111',
   },
}

export default config