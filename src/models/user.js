import mongoose from 'mongoose';
import { isEmail } from 'validator';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'first name is required'],
      minlength: [3, 'First name must be at least 3 letters'],
      maxlength: [20, 'First name cannot be more than 20 letters'],
      // trim: true,
      validate: {
        validator: value => !/^[' ']+$/.test(value),
        message: props => `Wwwww ${props.value}`,
      },
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      minlength: [3, 'Last name must be at least 3 letters'],
      maxlength: [20, 'Last name cannot be more than 20 letters'],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email address is required'],
      lowercase: true,
      trim: true,
      validate: {
        validator: isEmail,
        message: 'Email address is not valid',
        isAsync: false,
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 3 letters'],
      trim: true,
    },
  },
  { timestamps: true }
);

export default new mongoose.model('User', userSchema);
