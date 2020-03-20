import dotenv from 'dotenv';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import * as Sentry from '@sentry/node';
import schema from '../schema/schema';

import configs from '../configs';

dotenv.config();

const appInt = async app => {
  Sentry.init({ dsn: configs.sentry });
  app.use(Sentry.Handlers.requestHandler());

  app.use(
    '/graphql',
    graphqlHTTP({
      graphiql: true,
      schema,
    })
  );

  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());

  app.use('*', (req, res) =>
    res.status(400).json({
      success: false,
      message: 'Route not found',
    })
  );
};

export default appInt;
