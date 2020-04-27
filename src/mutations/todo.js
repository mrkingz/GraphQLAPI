import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql'
import { GraphQLTime, GraphQLDate } from 'graphql-iso-date'
import { TodoType } from '../schemas/todo'
import { createTodoResolver, markCompletedResolver, updateTodoResolver, deleteTodoResolver } from '../resolvers/todo'

export const createTodo = {
  type: new GraphQLNonNull(TodoType),
  args: {
    details: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLDate) },
    time: { type: new GraphQLNonNull(GraphQLTime) },
  },
  resolve: createTodoResolver,
}

export const markCompleted = {
  type: new GraphQLNonNull(TodoType),
  args: { todoId: { type: new GraphQLNonNull(GraphQLID) } },
  resolve: markCompletedResolver,
}

export const updateTodo = {
  type: new GraphQLNonNull(TodoType),
  args: {
    todoId: { type: new GraphQLNonNull(GraphQLID) },
    details: { type: GraphQLString },
  },
  resolve: updateTodoResolver,
}

export const deleteTodo = {
  type: TodoType,
  args: { todoId: { type: new GraphQLNonNull(GraphQLID) } },
  resolve: deleteTodoResolver,
}
