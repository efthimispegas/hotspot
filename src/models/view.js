import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const View = new Schema(
  {
    user_id: { type: String, required: true },
    hotspot_id: { type: String, required: true },
    created_at: { type: Date }
  },
  { collection: 'views' }
);

View.plugin(mongoosePaginate);

export default mongoose.model('View', View);
