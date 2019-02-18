import { _Comment, Hotspot } from '../models';
import { querySetup } from '../helpers/query.helpers';
import { checkInput } from '../helpers/hotspot.helpers';
import { checkView } from '../helpers';

/* [Working as expected] */
export const getHotspotComments = async (req, res) => {
  const { hotspotId } = req.params;
  try {
    //Try to find to hotspot specified by the hotspotId
    const foundHotspot = await Hotspot.findById(hotspotId);
    console.log('===============');
    console.log('[CommentController]:\n', foundHotspot);
    console.log('===============');
    //If the hotspot doesn't exist, handle it
    if (!foundHotspot) {
      return res.status(400).json({
        success: false,
        message: 'Requested hotspot was not found, try checking hotspot ID!'
      });
    }
    const q = querySetup(req);
    const query = { parent: hotspotId };
    const options = {
      limit: q.limit,
      offset: q.offset,
      select: 'description created_at user',
      sort: { created_at: 1 } //latest comment at the bottom
    };
    //Execute a query on the comments collection and
    //paginate the returned docs with the options above
    const { docs, total, limit, offset } = await _Comment.paginate(
      query,
      options
    );
    const message =
      total <= limit
        ? `Fetched ${total} comments`
        : `Successfull pagination. Fetched ${limit} out of ${total} comments`;
    return res.status(200).json({
      error: false,
      message,
      hotspot: foundHotspot._id,
      comments: docs,
      total,
      limit,
      offset
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: `Error when fetching comments from hotspot with id - ${hotspotId}`,
      details: e
    });
  }
};

/** [...Working on getting the Hotspot with its comments AND its views count] */
export const _getHotspotComments = async (req, res) => {
  //for now we get the user's id from the params but later we will change the endpoint
  //so we need to figure out a different way to check the view
  const { userId, hotspotId } = req.params;

  try {
    //Try to find to hotspot specified by the hotspotId
    const foundHotspot = await Hotspot.findById(hotspotId);
    console.log('===============');
    console.log('[CommentController]:\n', foundHotspot);
    console.log('===============');
    //If the hotspot doesn't exist, handle it
    if (!foundHotspot) {
      return res.status(400).json({
        success: false,
        message: 'Requested hotspot was not found, try checking hotspot ID!'
      });
    }
    //we check if the user has previously viewed the hotspot
    checkView(foundHotspot, userId);

    const q = querySetup(req);
    const query = { parent: hotspotId };
    const options = {
      limit: q.limit,
      offset: q.offset,
      select: 'description created_at user',
      sort: { created_at: 1 } //latest comment at the bottom
    };
    //Execute a query on the comments collection and
    //paginate the returned docs with the options above
    const { docs, total, limit, offset } = await _Comment.paginate(
      query,
      options
    );
    const message =
      total <= limit
        ? `Fetched ${total} comments`
        : `Successfull pagination. Fetched ${limit} out of ${total} comments`;
    return res.status(200).json({
      error: false,
      message,
      hotspot: foundHotspot._id,
      comments: docs,
      total,
      limit,
      offset
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: `Error when fetching comments from hotspot with id - ${hotspotId}`,
      details: e
    });
  }
};

/* [Working as expected] */
export const createComment = async (req, res) => {
  const { hotspotId } = req.params;

  try {
    //try find a hotspot with the requested id
    const foundHotspot = await Hotspot.findById(hotspotId);
    //check if the hotspot wasn't found, handle it
    if (!foundHotspot) {
      return res.status(400).json({
        success: false,
        message: `Requested hotspot with id - ${hotspotId} was not found. Check whether the hotspot ID is valid.`
      });
    }
    const q = checkInput(req);
    const newComment = new _Comment({
      parent: hotspotId,
      text: req.body.text,
      user: req.body.user,
      description: q.description,
      created_at: Date.now()
    });
    await newComment.save(err => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          success: false,
          message: `Coudn't save comment on hotspot with id - ${hotspotId}`,
          details: err
        });
      }
      foundHotspot.comments_count++;
      foundHotspot.save(function(err) {
        if (err) {
          return res.status(400).json({
            error: true,
            message: "Error when trying to update the hotspot's comments count",
            details: err
          });
        }
      });
      //return 201 for creation
      return res.status(201).json({
        sucess: true,
        message: `New comment on hotspot with id - ${hotspotId} created successfully!`,
        comment: newComment
      });
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'Error when creating new comment!',
      details: e
    });
  }
};
