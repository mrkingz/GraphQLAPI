import dotenv from 'dotenv';
import express from 'express';
import * as Sentry from '@sentry/node';

import configs from '../configs';
import appInt from './app';
import databaseConnection from './database';

dotenv.config();

const app = express();
app.disable('x-powered-by');

(async app => {
  try {
    await appInt(app);
    await databaseConnection(app.get('env'));

    const PORT = configs.port || 6000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${app.get('env')} mode`);
    });
  } catch (error) {
    Sentry.captureException(error);
  }
})(app);

export default app;
