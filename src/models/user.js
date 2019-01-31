import mongoose, { Schema } from 'mongoose';

const User = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true
  },
  {
    usePushEach: true
  }
);

export default mongoose.model('User', User);
