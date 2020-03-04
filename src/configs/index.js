import dotenv from 'dotenv'

dotenv.config()

const configs = {
  port: process.env.PORT,
  sentry: process.env.SENTRY,
}

export default configs
