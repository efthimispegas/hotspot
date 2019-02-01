import { _Comment } from '../models';
import { querySetup } from '../helpers/query.helpers';
import { checkInput } from '../helpers/hotspot.helpers';

/* [Working as expected] */
export const getAllComments = async (req, res) => {
  const { hotspotId } = req.params;
  const q = querySetup(req);
  try {
    const query = { parent: hotspotId };
    const options = {
      limit: q.limit,
      offset: q.offset,
      sort: { published_at: 1 },
      select: 'description published_at user'
    };

    const result = await _Comment.paginate(query, options);
    if (result) {
      return res.status(200).json({
        error: false,
        message: `Successfull pagination. Fetched ${result.total} comments`,
        comments: result
      });
    }
    return res.status(400).json({
      success: false,
      message:
        'Error with comments pagination method. Check whether the collection is empty'
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: `Error when fetching comments from hotspot with id - ${hotspotId}`,
      details: e.message
    });
  }
};

/* [Working as expected] */
export const createComment = async (req, res) => {
  const { hotspotId } = req.params;
  console.log('===============');
  console.log('[CommentController] :\n');
  console.log('===============');
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
          message: `Coudn't save comment!`,
          details: err
        });
      }
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
