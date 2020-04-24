import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import configs from '../../configs'
import errorFormatter from '../error/errorFormatter'
import User from '../../models/user'

const hashPassword = async password => {
  try {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  } catch (error) {
    throw errorFormatter(`Server error: ${error.message}`, 500)
  }
}

const verifyPassword = async (password, hashPassword) => {
  try {
    return bcrypt.compareSync(password, hashPassword)
  } catch (error) {
    throw errorFormatter(`Server error: ${error.message}`, 500)
  }
}

const generateToken = async payload => {
  try {
    return jwt.sign(payload, configs.jwtSecret)
  } catch (error) {
    throw errorFormatter(`Server error: ${error.message}`, 500)
  }
}

const verifyToken = token => {
  try {
    return jwt.verify(token, configs.jwtSecret)
  } catch (error) {
    throw errorFormater(`Server error: ${error.message}`, 500)
  }
}

const extractToken = context => {
  let token = context.headers['x-access-token'] || context.headers['authorization']

  if (token) {
    const match = new RegExp('^Bearer').exec(token)
    token = match ? token.split(' ')[1] : token
    return token.trim()
  }

  throw errorFormatter('Authentication token not provided', 401)
}

const checkAuth = async context => {
  const { userId } = verifyToken(extractToken(context))
  const user = await User.findById(userId, '-password')

  if (user) {
    return user
  }

  throw errorFormatter('Invalid authentication token provided', 401)
}

export { hashPassword, verifyPassword, generateToken, verifyToken, checkAuth }
