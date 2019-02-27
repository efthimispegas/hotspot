import async from 'async';

import { Hotspot, User, View, _Comment } from '../models';
import { querySetup } from '../helpers/query.helpers';
import {
  checkInput,
  setObject3D,
  setMessage
} from '../helpers/hotspot.helpers';
import config from '../config/config';

/* [Is working as expected] */
export const createHotspot = async (req, res) => {
  try {
    console.log('===============');
    console.log('[HotspotController] request.body received:\n', req.body);
    console.log('===============');
    const q = checkInput(req);
    let newHotspot = {};
    if (req.body.hasOwnProperty('obj')) {
      newHotspot = setObject3D(req, q);
    } else {
      newHotspot = setMessage(req, q);
    }

    console.log('===============');
    console.log('[HotspotController] new hotspot:\n', newHotspot);
    console.log('===============');
    await newHotspot.save(err => {
      if (err) {
        return res.status(400).json({
          success: false,
          messsage: 'Error with saving hotspot, bad request.',
          details: err
        });
      }
    });
    console.log('===============');
    console.log('[HotspotController] hotspot saved\n');
    console.log('===============');
    // return 201 for creation
    return res.status(201).json({
      success: true,
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

/** [Working as expected]  */
export const updateHotspot = async (req, res) => {
  const { hotspotId } = req.params;
  const { text, file, validity } = req.body;
  console.log('===============');
  console.log('[HotspotControlla] edit: \n', req.body);
  console.log('===============');

  const update = {
    text,
    description: text.length <= 150 ? text : text.substr(0, 150).concat('...'),
    file,
    validity
  };

  const options = {
    returnNewDocument: true,
    new: true,
    upsert: true,
    runValidators: true
  };
  try {
    await Hotspot.findByIdAndUpdate(hotspotId, update, options, function(
      err,
      result
    ) {
      if (err) {
        return res.status(400).json({
          success: false,
          messsage: `Error when trying and update hotspot with id - ${hotspotId}. Check the new values!`,
          details: err
        });
      }
      return res.status(200).json({
        success: true,
        message: `Hotspot with id - ${hotspotId} was updated!`,
        hotspot: result
      });
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'Error with updating hotspot',
      details: e
    });
  }
};

/** [Working as expected]  */
export const removeHotspot = async (req, res) => {
  const { hotspotId } = req.params;

  try {
    await Hotspot.findByIdAndRemove(hotspotId, function(err, result) {
      if (err) {
        return res.status(400).json({
          success: false,
          messsage: `Error when trying and delete hotspot with id - ${hotspotId}!`,
          details: err
        });
      }
      return res.status(200).json({
        success: true,
        message: `Hotspot with id - ${hotspotId} was deleted!`,
        hotspot: result
      });
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'General error in removing hotspot',
      details: e
    });
  }
};

/* [Is working as expected] */
export const getHotspot = async (req, res) => {
  const { hotspotId } = req.params;

  try {
    const foundHotspot = await Hotspot.findById(hotspotId);
    if (!foundHotspot) {
      return res.status(400).json({
        success: false,
        message: `Requested hotspot with id - ${hotspotId} does not exist!`
      });
    } else {
      if (!foundHotspot.valid) {
        return res.status(400).json({
          success: false,
          message:
            'You cannot write on this hotspot anymore because it has expired.'
        });
      }
      //return 200 for success
      return res.status(200).json({
        success: true,
        message: `Successfully fetched requested hotspot with id - ${hotspotId}`,
        hotspot: foundHotspot
      });
    }
  } catch (e) {
    return res.status(e.status).json({
      error: true,
      message: `Error with getting hotspot! Check whether the provided hotspot ID is valid.`,
      details: e
    });
  }
};

/* [Is working as expected] */
export const getUserHotspots = async (req, res) => {
  const { userId } = req.params;
  try {
    //Try to find to User specified by the userId
    const foundUser = await User.findById(userId);
    console.log('===============');
    console.log('[HotspotController] found user:\n', foundUser);
    console.log('===============');
    //If the User doesn't exist, handle it
    if (!foundUser) {
      return res.status(400).json({
        success: false,
        message: 'Requested User was not found, try checking user ID!'
      });
    }
    const q = querySetup(req);
    const query = { 'user.id': userId, parent: null, valid: true };
    const options = {
      limit: q.limit,
      offset: q.offset,
      select: 'description text loc user object validity valid created_at',
      sort: { created_at: 1 } //latest hotspot at the bottom
    };
    //Execute a query on the hotspots collection and
    //paginate the returned docs with the options above
    const { docs, total, limit, offset } = await Hotspot.paginate(
      query,
      options
    );
    const message =
      total <= limit
        ? `Fetched ${total} hotspots`
        : `Successfull pagination. Fetched ${limit} out of ${total} hotspots`;
    return res.status(200).json({
      error: false,
      message,
      user: foundUser._id,
      hotspots: docs,
      total,
      limit,
      offset
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: `Error when fetching hotspots from user with id - ${userId}`,
      details: e.message
    });
  }
};

export const removeExpiredHotspots = async (req, res) => {
  try {
    const conditions = {
      validity: { $lt: Date.now() }
    };
    const response = await Hotspot.remove(conditions, function(err) {
      if (err) {
        console.log('===============');
        console.log('ERROR in deletion:', err);
        console.log('===============');
        throw err;
      }
    });

    console.log('===============');
    console.log('result of deleteMany:', response);
    console.log('===============');
    return res.status(200).json({
      success: true,
      message: 'Deleted hotspots that have expired',
      response
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error
    });
  }
};

/** [Working on getting a user hotspots with comments and view/comment count] */
//use it for the details screen
export const _getUserHotspots = async (req, res) => {
  const { userId } = req.params;
  try {
    //Try to find to User specified by the userId
    const foundUser = await User.findById(userId);
    console.log('===============');
    console.log('[HotspotController] found user:\n', foundUser);
    console.log('===============');
    //If the User doesn't exist, handle it
    if (!foundUser) {
      return res.status(400).json({
        success: false,
        message: 'Requested User was not found, try checking user ID!'
      });
    }
    const q = querySetup(req);
    const query = { 'user.id': userId, parent: null, valid: true };
    const options = {
      limit: q.limit,
      offset: q.offset,
      sort: { created_at: -1 } //latest hotspot up top
    };
    //Execute a query on the hotspots collection and
    //paginate the returned docs with the options above
    const { docs, total, limit, offset } = await Hotspot.paginate(
      query,
      options
    );
    console.log('===============');
    console.log('[HotspotController] found hotspots:', docs);
    console.log('===============');
    let newDocs = [];
    const getCount = (entry, index, callback) => {
      const conditions = {
        user_id: userId,
        hotspot_id: entry._id,
        sort: { created_at: 1 }
      };
      View.findOne(conditions, function(err, docs) {
        if (err) {
          console.log(err);
          throw new Error(err);
        }
        if (!docs) {
          docs = entry;
        }
        _Comment.count(
          {
            parent: entry._id,
            created_at: { $gte: docs.created_at.toISOString() },
            'user.id': { $ne: userId }
          },
          function(err, count) {
            if (err) {
              console.log(err);
              throw new Error(err);
            }
            console.log('===============');
            console.log('entry:', entry);
            console.log('===============');
            newDocs[index] = {};
            newDocs[index]._id = entry._id;
            newDocs[index].text = entry.text;
            newDocs[index].description = entry.description;
            newDocs[index].validity = entry.validity;
            newDocs[index].valid = entry.valid;
            newDocs[index].loc = entry.loc;
            newDocs[index].file = entry.file;
            newDocs[index].created_at = entry.created_at;
            newDocs[index].views_count = entry.views_count;
            newDocs[index].comments_count = entry.comments_count;
            newDocs[index].new_comments_count = count;

            callback();
          }
        );
      });
    };

    async.forEachOf(docs, getCount, function(err) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: 'Error inside async.forEachOf',
          details: err
        });
      }
      const message =
        total <= limit
          ? `Fetched ${total} hotspots`
          : `Successfull pagination. Fetched ${limit} out of ${total} hotspots`;
      return res.status(201).json({
        success: true,
        message,
        docs: newDocs,
        total,
        limit,
        offset
      });
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: `Error when fetching hotspots from user with id - ${userId}`,
      details: e.message
    });
  }
};

/* [Is working as expected] */
// use it for loading hotspots in homescreen
export const getHotspotsWithinRadius = async (req, res) => {
  console.log('===============');
  console.log('[HotspotControlla] hotspots within radius:', req.query);
  console.log('===============');
  if (
    !req.query.hasOwnProperty('lat') ||
    !req.query.hasOwnProperty('lng') ||
    isNaN(req.query.lat) ||
    isNaN(req.query.lng)
  ) {
    return res.status(400).json({
      error: true,
      message: 'Input coordinates are not set, or are invalid'
    });
  }

  const q = querySetup(req);
  const query = {
    valid: true,
    parent: null,
    loc: {
      $geoWithin: {
        $centerSphere: [
          [parseFloat(req.query.lat), parseFloat(req.query.lng)],
          config.RADIUS_RATIO
        ]
      }
    }
  };
  const options = {
    limit: q.limit,
    offset: q.offset,
    select:
      'description text file loc user object validity valid views_count comments_count created_at'
  };

  try {
    //Execute a query on the hotspots collection and
    //paginate the returned docs with the options above
    const { docs, limit, total } = await Hotspot.paginate(query, options);
    if (docs) {
      const message =
        total <= limit
          ? `Fetched ${total} hotspots`
          : `Successfull pagination. Fetched ${limit} out of ${total} hotspots`;
      return res.status(200).json({
        error: false,
        message,
        hotspots: docs
      });
    }
    return res.status(400).json({
      success: false,
      message:
        'Error with hotspots pagination method. Check whether the collection is empty'
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: e
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
    select: 'description text loc user object validity valid created_at'
  };

  try {
    //Execute a query on the hotspots collection and
    //paginate the returned docs with the options above
    const { docs, limit, total } = await Hotspot.paginate(query, options);
    if (docs) {
      const message =
        total <= limit
          ? `Fetched ${total} hotspots`
          : `Successfull pagination. Fetched ${limit} out of ${total} hotspots`;
      return res.status(200).json({
        error: false,
        message,
        hotspots: docs
      });
    }
    return res.status(400).json({
      success: false,
      message:
        'Error with hotspots pagination method. Check whether the collection is empty'
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: e
    });
  }
};
