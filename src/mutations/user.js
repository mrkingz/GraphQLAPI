import { GraphQLString, GraphQLNonNull } from 'graphql'
import { UserType } from '../schemas/user'
import { signUpResolver } from '../resolvers/user'

const createUser = {
  type: new GraphQLNonNull(UserType),
  args: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: signUpResolver,
}

export { createUser }
