import mongoose, { Schema } from 'mongoose';

const Hotspot = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    hotspotDate: {
      type: Date
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: '_Location'
    }
  },
  {
    timestamps: true
  },
  {
    usePushEach: true
  }
);

export default mongoose.model('Hotspot', Hotspot);
