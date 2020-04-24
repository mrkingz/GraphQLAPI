import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema(
  {
    completed: {
      type: Boolean,
      default: false,
    },
    details: {
      type: String,
      required: [true, 'Details is required'],
      minlength: [10, 'Details cannot be less 10 letter'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

export default new mongoose.model('Todo', todoSchema)
