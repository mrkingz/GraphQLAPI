import mongoose from 'mongoose';

import configs from '../configs';

const database = async env => {
  return mongoose.connect(configs.databseURL[env], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default database;
