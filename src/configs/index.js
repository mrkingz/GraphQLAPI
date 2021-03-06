import dotenv from 'dotenv'

dotenv.config()

const configs = {
  port: process.env.PORT,
  sentry: process.env.SENTRY_DNS,
  databaseName: process.env.DATABASE_NAME,
  jwtSecret: process.env.JWT_SECRET,
  databseURL: {
    development: process.env.DATABASE_URL_DEV,
  },
}

export default configs
