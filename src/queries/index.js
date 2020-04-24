import { GraphQLObjectType } from 'graphql'
import { signIn } from './user'
import { getTodos, getTodo } from './todo'

export default new GraphQLObjectType({
  name: 'QueryType',
  fields: () => ({
    auth: signIn,
    todos: getTodos,
    todo: getTodo,
  }),
})
