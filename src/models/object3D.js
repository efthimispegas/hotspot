import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Object3D = new Schema(
  {
    text: { type: String },
    description: { type: String },
    object: { type: Boolean, default: true },
    loc: {
      coordinates: { type: Array, required: true },
      type: { type: String, required: true }
    },
    validity: { type: Number },
    valid: { type: Boolean, default: true },
    obj: { type: Object },
    views_count: { type: Number, default: 0 },
    comments_count: { type: Number, default: 0 },
    user: {
      id: { type: String },
      username: { type: String }
    },
    created_at: { type: Date }
  },
  { collection: 'hotspots' }
);

Object3D.plugin(mongoosePaginate);

export default mongoose.model('Object3D', Object3D);
