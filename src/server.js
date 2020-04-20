import dotenv from 'dotenv'
import express from 'express'

import * as Sentry from '@sentry/node'
import configs from './configs'

dotenv.config()

const app = express()

Sentry.init({ dsn: configs.sentry })
app.use(Sentry.Handlers.requestHandler())

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

app.use('*', (req, res) =>
  res.statusCode(400).json({
    success: false,
    message: 'Route not found',
  })
)

const PORT = configs.port || 6000

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT} in ${app.get('env')} mode`)
})
