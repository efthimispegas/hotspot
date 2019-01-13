import mongoose, { Schema } from 'mongoose';

const _Location = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: [3, 'Name must me at least 3 characters long!']
    },
    description: {
      type: String,
      required: true,
      unique: true,
      minLength: [5, 'Description must me at least 5 characters long!']
    },
    category: {
      type: String
    },
    hotspots: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Hotspot'
      }
    ]
  },
  { timestamps: true },
  {
    usePushEach: true
  }
);

/**
 * Create a hotspot and add it to the particular
 * location's array of hotspots
 */

_Location.statics.addHotspot = async function(id, args) {
  const Hotspot = mongoose.model('Hotspot');
  //craete a new hotspot with a property of key "locations" and a value of the location's id
  const newHotspot = new Hotspot({ ...args, location: id });
  //find the location by id and update its hotspots property
  await this.findByIdAndUpdate(id, { $push: { hotspots: newHotspot.id } });
  //finally we save the newly created hotspot and return it
  return {
    hotspot: await newHotspot.save()
  };
};

export default mongoose.model('_Location', _Location);
