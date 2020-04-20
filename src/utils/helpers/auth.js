import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import configs from '../../configs'
import errorFormatter from '../error/errorFormatter'

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

const verifyToken = async token => {
  try {
    return jwt.verify(token, configs.jwtSecret)
  } catch (error) {
    throw errorFormater(`Server error: ${error.message}`, 500)
  }
}

export { hashPassword, verifyPassword, generateToken, verifyToken }
