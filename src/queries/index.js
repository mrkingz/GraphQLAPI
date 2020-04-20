import { GraphQLObjectType } from 'graphql'
import { signIn } from './user'

export default new GraphQLObjectType({
  name: 'QueryType',
  fields: () => ({
    auth: signIn,
  }),
})
