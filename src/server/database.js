import mongoose from 'mongoose';

import configs from '../configs';

const databaseConnection = async env => {
  return mongoose.connect(`${configs.databseURL[env]}`, {
    dbName: configs.databaseName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

export default databaseConnection;
