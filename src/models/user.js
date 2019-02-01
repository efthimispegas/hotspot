import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const User = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    avatar: {
      filename: { type: String },
      path: { type: String }
    },
    country_id: { type: String },
    public: { type: Boolean, default: true },
    gender: String
  },
  { collection: 'users' }
);

User.plugin(mongoosePaginate);

export default mongoose.model('User', User);
