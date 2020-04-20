import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import queries from '../queries';
import mutations from '../mutations';

export default new GraphQLSchema({
  query: queries,
  mutation: mutations,
});
