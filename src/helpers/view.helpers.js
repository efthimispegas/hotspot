import { View, Hotspot } from '../models';

export const setView = (hotspot_id, user_id) => {
  return new View({
    user_id,
    hotspot_id,
    created_at: new Date()
  });
};

export const checkView = async (hotspot, user_id) => {
  try {
    const foundView = await View.findOne({
      user_id,
      hotspot_id: hotspot._id
    });

    if (!foundView) {
      //we only update view count on unique views
      updateViewCountOnHotspot(hotspot);
    }
    //but we record every view (for meta, stats etc)
    const newView = setView(hotspot._id, user_id);
    console.log('===============');
    console.log('newView:', newView);
    console.log('===============');
    await newView.save(function(err) {
      if (err) {
        console.log(err);
        throw new Error(err);
      }
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const updateViewCountOnHotspot = hotspot => {
  console.log('===============');
  console.log('View count is being updated...\n');
  console.log('===============');

  const conditions = { _id: hotspot._id };
  const update = { $inc: { views_count: 1 } };
  const res = Hotspot.update(conditions, update, [], err => {
    if (err) {
      console.log(err);
      throw new Error(err);
    }
  });
};
