import { GraphQLID, GraphQLString, GraphQLList, GraphQLObjectType } from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'
import { TodoType } from './todo'

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
    todos: {
      type: new GraphQLList(TodoType),
      resolve: parent => {
        parent.todos = parent.todos.filter(todo => {
          if (todo.date && todo.details) {
            todo.time = todo.date
            return todo
          }
        })
        return parent.todos
      },
    },
  }),
})

const Token = new GraphQLObjectType({
  name: 'AuthToken',
  fields: () => ({
    token: { type: GraphQLString },
  }),
})

export { UserType, Token }
