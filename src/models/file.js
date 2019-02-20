import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const File = new Schema(
  {
    uri: { type: String, required: true },
    uploaded_at: { type: Date },
    user_id: { type: String }
  },
  { collection: 'files' }
);

File.plugin(mongoosePaginate);

export default mongoose.model('File', File);
