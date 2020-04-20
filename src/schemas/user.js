import { GraphQLID, GraphQLString, GraphQLObjectType } from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'

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
    token: { type: GraphQLString },
  }),
})

const Token = new GraphQLObjectType({
  name: 'AuthToken',
  fields: () => ({
    token: { type: GraphQLString },
  }),
})

export { UserType, Token }
