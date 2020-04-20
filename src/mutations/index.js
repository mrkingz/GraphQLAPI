import { GraphQLObjectType } from 'graphql';
import { createUser } from './user';

export default new GraphQLObjectType({
  name: 'MutationType',
  fields: () => ({
    user: createUser,
  }),
});
