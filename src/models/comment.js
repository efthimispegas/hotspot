import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const _Comment = new Schema(
  {
    text: { type: String, required: true },
    description: { type: String, required: true },
    parent: { type: String },
    user: {
      id: { type: String },
      username: { type: String },
      avatar: {
        uri: { type: String }
      }
    },
    created_at: { type: Date }
  },
  { collection: 'comments' }
);

_Comment.plugin(mongoosePaginate);

export default mongoose.model('_Comment', _Comment);
