import { GraphQLObjectType } from 'graphql'
import { createUser } from './user'
import { createTodo, markCompleted, updateTodo } from './todo'

export default new GraphQLObjectType({
  name: 'MutationType',
  fields: () => ({
    user: createUser,
    todo: createTodo,
    complete: markCompleted,
    update: updateTodo,
  }),
})
