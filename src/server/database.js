import mongoose from 'mongoose'

import configs from '../configs'

const databaseConnection = async env => {
  // mongoose.set('debug', env === 'development');
  return mongoose.connect(`${configs.databseURL[env]}`, {
    dbName: configs.databaseName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
}

export default databaseConnection
