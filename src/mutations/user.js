import { GraphQLString, GraphQLNonNull, validate } from 'graphql';
import { UserType, UserSignUp } from '../schemas/user';
import User from '../models/user';
import errorFormatter from '../utils/error/errorFormatter';
import validator from '../utils/helpers/validator';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const createUser = {
  type: new GraphQLNonNull(UserType),
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (parent, { firstName, lastName, email, password }) => {
    const result = await User.findOne({ email }, 'email');
    if (result) {
      throw errorFormatter({ email: 'Email address has been used' }, 409);
    } else {
      const hashedPassword = bcrypt.hashSync(password, salt);
      const user = await (
        await validator(new User(), {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        })
      ).save();

      delete user._doc.password;
      return user;
    }
  },
};

export { createUser };
