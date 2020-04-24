import { TodoType } from '../schemas/todo'
import { GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql'
import { checkAuth } from '../utils/helpers/auth'
import Todo from '../models/todo'

const getTodos = {
  type: new GraphQLList(TodoType),
  resolve: async (parent, args, context) => {
    const user = await checkAuth(context)
    await user.populate('todos').execPopulate()
    return user.todos
  },
}

const getTodo = {
  type: TodoType,
  args: { todoId: { type: GraphQLNonNull(GraphQLID) } },
  resolve: async (parent, args, context) => {
    const user = await checkAuth(context)
    const todo = await Todo.findOne({ $and: [{ _id: args.todoId }, { user }] })
    todo.time = todo._doc.date
    return { todo, user }
  },
}

export { getTodos, getTodo }
