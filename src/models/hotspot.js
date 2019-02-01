import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Hotspot = new Schema(
  {
    text: { type: String, required: true },
    description: { type: String, required: true },
    loc: {
      lng: { type: Number },
      lat: { type: Number }
    },
    city: { type: String },
    country: { type: String },
    validity: { type: Number },
    valid: { type: Boolean, default: true },
    file: { type: Object },
    views_count: { type: Number },
    comments_count: { type: Number },
    user: {
      id: { type: String },
      username: { type: String }
    },
    created_at: { type: Date }
  },
  { collection: 'hotspots' }
);

Hotspot.plugin(mongoosePaginate);

export default mongoose.model('Hotspot', Hotspot);
