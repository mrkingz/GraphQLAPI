import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql'
import { GraphQLTime, GraphQLDate } from 'graphql-iso-date'
import { TodoType } from '../schemas/todo'
import { createTodoResolver, markCompletedResolver, updateTodoResolver } from '../resolvers/todo'

const createTodo = {
  type: new GraphQLNonNull(TodoType),
  args: {
    details: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLDate) },
    time: { type: new GraphQLNonNull(GraphQLTime) },
  },
  resolve: createTodoResolver,
}

const markCompleted = {
  type: new GraphQLNonNull(TodoType),
  args: { todoId: { type: new GraphQLNonNull(GraphQLID) } },
  resolve: markCompletedResolver,
}

const updateTodo = {
  type: new GraphQLNonNull(TodoType),
  args: {
    todoId: { type: new GraphQLNonNull(GraphQLID) },
    details: { type: GraphQLString },
  },
  resolve: updateTodoResolver,
}

export { createTodo, markCompleted, updateTodo }
