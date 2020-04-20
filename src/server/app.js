import dotenv from 'dotenv'
import graphqlHTTP from 'express-graphql'
import * as Sentry from '@sentry/node'
import schema from '../schemas'

import configs from '../configs'

dotenv.config()

const appInt = async app => {
  Sentry.init({ dsn: configs.sentry })

  app.use(Sentry.Handlers.requestHandler())
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      return res.status(200).json()
    }
    return next()
  })

  app.use('/graphql', (req, res) =>
    graphqlHTTP({
      graphiql: true,
      schema,
      context: req,
      customFormatErrorFn: error => {
        const {
          message: { statusCode, error: err },
        } = error
        res.statusCode = statusCode || 500
        return { message: error.message.statusCode ? err : error.message }
      },
    })(req, res)
  )

  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler())

  app.use('*', (req, res) =>
    res.status(400).json({
      success: false,
      message: 'Route not found',
    })
  )
}

export default appInt
