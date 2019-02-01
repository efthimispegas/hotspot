import Hotspot from '../models/hotspot';
import { querySetup } from '../helpers/query.helpers';
import { checkInput } from '../helpers/hotspot.helpers';

/* [Is working as expected] */
export const createHotspot = async (req, res) => {
  try {
    // console.log('===============');
    // console.log('[HotspotController] request.body received\n:', req.body);
    // console.log('===============');
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
    // console.log('===============');
    // console.log('[HotspotController] hotspot created\n', newHotspot);
    // console.log('===============');

    await newHotspot.save(err => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: 'Error when trying to save hotspot!',
          details: err
        });
      }
    });
    // console.log('===============');
    // console.log('[HotspotController] hotspot saved\n');
    // console.log('===============');
    // return 201 for creation
    return res.status(201).json({
      sucess: true,
      message: `New hotspot with id - ${newHotspot._id} created successfully!`,
      hotspot: newHotspot
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'Error with creating hotspot!',
      details: e.message
    });
  }
};

/* [Is working as expected] */
export const getHotspot = async (req, res) => {
  const { hotspotId } = req.params;

  try {
    //return 200 for success
    return res.status(200).json({
      success: true,
      message: `Successfully fetched requested hotspot with id - ${hotspotId}`,
      hotspot: await Hotspot.find({ _id: hotspotId })
    });
  } catch (e) {
    return res.status(e.status).json({
      error: true,
      message: `Error with getting hotspot! Check whether the provided hotspot ID is valid.`,
      details: e
    });
  }
};

/* [Is working as expected] */
export const getAllHotspots = async (req, res) => {
  const q = querySetup(req);
  const query = { parent: null };
  const options = {
    limit: q.limit,
    offset: q.offset,
    select: 'description loc user'
  };

  const result = await Hotspot.paginate(query, options);
  if (result) {
    return res.status(200).json({
      error: false,
      message: `Successfull pagination. Fetched ${result.limit} out of ${
        result.total
      } hotspots`,
      hotspots: result
    });
  }
  return res.status(400).json({
    success: false,
    message:
      'Error with hotspots pagination method. Check whether the collection is empty'
  });
};
