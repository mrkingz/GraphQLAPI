import { checkAuth } from '../utils/helpers/auth'
import validator from '../utils/helpers/validator'
import Todo from '../models/todo'
import { dateFormatter } from '../utils/helpers/dateFormatter'
import errorFormatter from '../utils/error/errorFormatter'
import mongoose from 'mongoose'
import { validate } from 'graphql'

const createTodoResolver = async (parents, { date, time, details }, context) => {
  const user = await checkAuth(context)

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    let todo = await validator(new Todo(), { date: dateFormatter(date, time), details, user }).save({ session })
    todo.user = await user.populate('todos').execPopulate()
    todo.time = todo.date
    await user.todos.push(todo.id)
    await user.save({ session })

    await session.commitTransaction()

    return todo
  } catch (error) {
    await session.abortTransaction()
    throw errorFormatter(`Server error: ${error.message}`, 500)
  } finally {
    session.endSession()
  }
}

const markCompletedResolver = async (parent, args, context) => {
  const user = await checkAuth(context)
  const todo = await Todo.findOne({ $and: [{ _id: args.todoId }, { user }] })
  if (todo) {
    todo.completed = true
    await todo.save()
    todo.time = todo.date
    todo.user = user

    return todo
  }

  throw errorFormatter('Todo does not exist', 404)
}

const updateTodoResolver = async (parent, args, context) => {
  const user = await checkAuth(context)
  let todo = await Todo.findOne({ $and: [{ _id: args.todoId }, { user }] })

  if (!todo) {
    throw errorFormatter('Todo does not exist', 404)
  } else if (todo.completed) {
    throw errorFormatter('Completed todo cannot be edited', 403)
  } else {
    todo.details = args.details
    await validator(todo, { ...todo._doc }, 'details')
    await todo.save()
    todo.time = todo.date
    todo.user = user

    return todo
  }
}

export { createTodoResolver, markCompletedResolver, updateTodoResolver }
