import User from '../models/user'
import errorFormatter from '../utils/error/errorFormatter'
import validator from '../utils/helpers/validator'
import { hashPassword, generateToken, verifyPassword, checkAuth } from '../utils/helpers/auth'

/**
 * Gets a user
 *
 * @param {Object} parent
 * @param {Object} args
 * @returns {Promise<Object>} a promise that resolves with the found user, otherwise throws an error if not found
 */
const getUserResolver = async (parent, args) => {
  return User.findOne({ _id: args.user.id }, '-password')
}

const signInResolver = async (parent, { email, password }) => {
  if (!email || !password) {
    throw errorFormatter('Email and password are required', 401)
  } else {
    const user = await User.findOne({ email: email.toLowerCase() }, 'email, password')
    if (user) {
      const isVerified = await verifyPassword(password, user._doc.password)
      if (isVerified) {
        return { token: await generateToken({ userId: user.id }) }
      }
    }

    throw errorFormatter('Invalid credentials', 401)
  }
}

const signUpResolver = async (parent, { firstName, lastName, email, password }) => {
  const result = await User.findOne({ email }, 'email')
  if (result) {
    throw errorFormatter({ email: 'Email address has been used' }, 409)
  } else {
    const hashedPassword = await hashPassword(password)
    const user = await validator(new User(), {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save()

    delete user._doc.password
    return user
  }
}

export { signUpResolver, signInResolver, getUserResolver }
