import { Hotspot, Object3D } from '../models';

export const checkInput = req => {
  const { text, loc } = req.body;
  let lat, lng, description;
  if (loc !== undefined && loc.coordinates !== undefined) {
    lat = loc.coordinates[0];
    lng = loc.coordinates[1];
  }
  if (text) {
    description = text.length <= 150 ? text : text.substr(0, 150).concat('...');
  }

  return { lat, lng, description };
};

export const setMessage = (req, q) => {
  return new Hotspot({
    text: req.body.text,
    description: q.description,
    object: false,
    loc: {
      coordinates: [q.lat, q.lng],
      type: 'Point'
    },
    validity: new Date(Date.now() + req.body.validity * 60000), //the hotspot will be valid from now until now+validity*1min
    user: req.body.user,
    file: {
      uri: req.body.file.uri
    },
    views_count: 0,
    comments_count: 0,
    created_at: Date.now()
  });
};

export const setObject3D = (req, q) => {
  return new Object3D({
    text: req.body.text,
    description: q.description,
    object: true,
    loc: {
      coordinates: [q.lat, q.lng],
      type: 'Point'
    },
    validity: new Date(Date.now() + req.body.validity * 60000),
    user: req.body.user,
    obj: req.body.obj,
    views_count: 0,
    created_at: Date.now()
  });
};
