import { GraphQLString } from 'graphql'
import { Token } from '../schemas/user'
import { signInResolver } from '../resolvers/user'

const signIn = {
  type: Token,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: signInResolver,
}

export { signIn }
