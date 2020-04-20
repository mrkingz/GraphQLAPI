import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import userQuery from './user';

export default new GraphQLObjectType({
  name: 'QueryType',
  fields: () => ({
    user: userQuery,
  }),
});
