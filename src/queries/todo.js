import { TodoType } from '../schemas/todo'
import { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLBoolean } from 'graphql'
import { checkAuth } from '../utils/helpers/auth'
import Todo from '../models/todo'
import { getTodosResolver, getTodoResolver } from '../resolvers/todo'

const getTodos = {
  type: new GraphQLList(TodoType),
  args: { completed: { type: GraphQLBoolean } },
  resolve: getTodosResolver,
}

const getTodo = {
  type: TodoType,
  args: { todoId: { type: GraphQLNonNull(GraphQLID) } },
  resolve: getTodoResolver,
}

export { getTodos, getTodo }
