import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Hotspot = new Schema(
  {
    text: { type: String, required: true },
    description: { type: String, required: true },
    object: { type: Boolean, default: false },
    loc: {
      coordinates: { type: Array, required: true },
      type: { type: String, required: true }
    },
    city: { type: String },
    country: { type: String },
    validity: { type: Number },
    valid: { type: Boolean, default: true },
    file: { type: Object },
    views_count: { type: Number, default: 0 },
    comments_count: { type: Number, default: 0 },
    user: {
      id: { type: String },
      username: { type: String },
      avatar: { uri: { type: String } }
    },
    created_at: { type: Date }
  },
  { collection: 'hotspots' }
);

Hotspot.plugin(mongoosePaginate);

export default mongoose.model('Hotspot', Hotspot);
