import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

import mongoosePaginate from 'mongoose-paginate';

const User = new Schema(
  {
    //not used currently, but for future implementation they 're provided
    provider: { type: String, enum: ['local', 'google', 'facebook'] },
    providerData: {
      uid: { type: String },
      username: { type: String },
      email: { type: String, unique: true },
      fullname: { type: String },
      avatar: {
        uri: { type: String }
      }
    },
    access_token: { type: String, unique: true },
    email: { type: String, unique: true },
    username: { type: String },
    password: { type: String },
    avatar: {
      uri: { type: String, default: null }
    },
    city: { type: String },
    birthday: { type: String },
    fullname: { type: String },
    gender: { type: String, enum: ['male', 'female'] },
    public: { type: Boolean, default: true }
  },
  { collection: 'users' }
);

User.pre('save', async function(next) {
  if (this.provider !== 'local') {
    next();
  }
  try {
    //generate a salt
    const salt = await bcrypt.genSalt(10);
    //hash the user's password with the salt
    const hash = await bcrypt.hash(this.password, salt);
    //assign the hashed version to the user's password
    this.password = hash;
    //give the order to proceed with the rest of the code
    next();
  } catch (error) {
    next(error);
  }
});

User.methods.isMatch = async function(newPassword) {
  try {
    //compare the given password with the stored hashed password
    const isMatch = await bcrypt.compare(newPassword, this.password);
    //if there is a match, return true
    return isMatch;
  } catch (error) {
    throw new Error(error);
  }
};

User.plugin(mongoosePaginate);

export default mongoose.model('User', User);
