import Hotspot from '../models/hotspot';
import { querySetup } from '../helpers/query.helpers';
import { checkInput } from '../helpers/hotspot.helpers';

export const createHotspot = async (req, res) => {
  console.log('===============');
  console.log('[HotspotController]\n:', req.body);
  console.log('===============');
  try {
    const q = checkInput(req);
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
      description: q.description,
      loc: { lng: q.lng, lat: q.lat },
      city,
      country,
      validity,
      user: {
        id,
        username
      },
      file,
      created_at: Date.now()
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
    return res.status(201).json({
      sucess: true,
      message: `New hotspot with id - ${hotspotId} created successfully!`,
      hotspot: newHotspot
    });
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
      message: `Error with getting hotspot! Check whether the provided hotspot ID is valid.`,
      details: e
    });
  }
};

export const getAllHotspots = async (req, res) => {
  const q = querySetup(req);
  const query = { parent: null };
  const options = {
    limit: q.limit,
    offset: q.offset,
    select: 'description loc'
  };

  const result = await Hotspot.paginate(query, options);
  if (result) {
    return res.status(200).json({
      error: false,
      message: `Successfull pagination. Fetched ${result.total} hotspots`,
      hotspots: result
    });
  }
  return res.status(400).json({
    success: false,
    message:
      'Error with hotspots pagination method. Check whether the collection is empty'
  });
};
