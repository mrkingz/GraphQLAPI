import { GraphQLString } from 'graphql'
import { Token } from '../schemas/user'
import User from '../models/user'
import errorFormatter from '../utils/error/errorFormatter'
import { generateToken, verifyPassword } from '../utils/helpers/auth'

const signIn = {
  type: Token,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (parent, { email, password }) => {
    if (!email || !password) {
      throw errorFormatter('Email and password is required', 401)
    } else {
      const user = await User.findOne({ email }, 'email, password')
      if (user) {
        const isVerified = await verifyPassword(password, user._doc.password)
        if (isVerified) {
          return { token: await generateToken({ userId: user.id }) }
        }
      }

      throw errorFormatter('Invalid credentials', 401)
    }
  },
}

export { signIn }
