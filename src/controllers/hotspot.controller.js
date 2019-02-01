import Hotspot from '../models/hotspot';

export const createHotspot = async (req, res) => {
  console.log('===============');
  console.log('[HotspotController]\n:', req.body);
  console.log('===============');
  try {
    const {
      text,
      loc: { lng, lat },
      city,
      country,
      validity,
      user: { id, username },
      file
    } = req.body;
    const newHotspot = new Hotspot({
      text,
      description: text.substr(0, 150),
      loc: { lng, lat },
      city,
      country,
      validity,
      user: {
        id,
        username
      },
      file
    });

    await newHotspot.save(err => {
      if (err) {
        return res.status(400).json({
          error: true,
          message: err.message,
          details: err
        });
      }
    });
    //return 201 for creation
    return res.status(201).json({ hotspot: newHotspot });
  } catch (e) {
    return res.status(e.status).json({
      error: true,
      message: 'Error with creating hotspot!',
      details: e
    });
  }
};

export const getHotspot = async (req, res) => {
  const { title, description } = req.body;
  const { hotspotId } = req.params;

  try {
    //return 200 for success
    return res
      .status(200)
      .json({ hotspot: await Hotspot.find({ _id: hotspotId }) });
  } catch (e) {
    return res.status(e.status).json({
      error: true,
      message: 'Error with getting all hotspots!',
      details: e
    });
  }
};

export const getAllHotspots = async (req, res) => {
  const { title, description } = req.body;

  try {
    //return 200 for success
    return res.status(200).json({ hotspots: await Hotspot.find() });
  } catch (e) {
    return res.status(e.status).json({
      error: true,
      message: 'Error with getting all hotspots!',
      details: e
    });
  }
};
