import { GraphQLID, GraphQLString, GraphQLObjectType, GraphQLBoolean } from 'graphql'
import { GraphQLTime, GraphQLDate, GraphQLDateTime } from 'graphql-iso-date'
import { UserType } from './user'
import { getUserResolver } from '../resolvers/user'

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: { type: GraphQLID },
    completed: { type: GraphQLBoolean },
    details: { type: GraphQLString },
    date: { type: GraphQLDate },
    time: { type: GraphQLTime },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
    user: { type: UserType },
  }),
})

export { TodoType }
