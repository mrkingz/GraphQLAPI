import dotenv from 'dotenv';
import express from 'express';
import * as Sentry from '@sentry/node';

import configs from '../configs';
import appInt from './app';
import database from './database';

dotenv.config();

(async () => {
  try {
    const app = express();

    await appInt(app);
    await database(app.get('env'));

    const PORT = configs.port || 6000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${app.get('env')} mode`);
    });
  } catch (error) {
    Sentry.captureException(error);
  }
})();
