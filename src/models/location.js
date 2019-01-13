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

_Location.statics.addHotspot = async function(id, args) {
  const Hotspot = mongoose.model('Hotspot');
  let location = await this.findById(id);
  // console.log(`Location before the hew hotspot's addition:\n ${location}\n`);
  // console.log('==============\n');

  const newHotspot = new Hotspot({ ...args, location: id });
  // console.log(`The new hotspot to add:\n ${newHotspot}\n`);
  // console.log('==============\n');

  await this.findByIdAndUpdate(id, { $push: { hotspots: newHotspot.id } });

  return {
    hotspot: await newHotspot.save()
  };
};

export default mongoose.model('_Location', _Location);
