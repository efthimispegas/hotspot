import { User, Hotspot, View, _Comment } from '../models';

/* [Is working as expected] */
export const getTotalUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(400).json({
        error: true,
        message: `No users found`
      });
    }
    let total = 0;
    users.map(el => {
      total++;
    });
    return res.status(200).json({
      success: true,
      message: `Request was successful, found all the users`,
      users: total
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'Request failed',
      details: e
    });
  }
};

/* [Is working as expected] */
export const getTotalComments = async (req, res) => {
  try {
    const comments = await _Comment.find();
    if (comments) {
      let total = 0;
      comments.map(el => {
        total++;
      });
      return res.status(200).json({
        success: true,
        message: 'Request was successful',
        comments: total
      });
    }
    return res.status(200).json({
      message: 'No comments found'
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: 'Request failed'
    });
  }
};

/* [Is working as expected] */
export const getTotalViews = async (req, res) => {
  try {
    const views = await View.find();
    if (views) {
      let total = 0;
      views.map(el => {
        total++;
      });
      return res.status(200).json({
        success: true,
        message: 'Request was successful',
        views: total
      });
    }
    return res.status(200).json({
      message: 'No views found'
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: 'Request failed'
    });
  }
};

/* [Is working as expected] */
export const getTotalHotspots = async (req, res) => {
  try {
    //Execute a query on the hotspots collection and
    //paginate the returned docs with the options above
    const hotspots = await Hotspot.find();
    if (hotspots) {
      let total = 0;
      hotspots.map(el => {
        total++;
      });
      return res.status(200).json({
        error: false,
        message: 'Request was successfull',
        hotspots: total
      });
    }
    return res.status(200).json({
      success: false,
      message: 'No hotspots found'
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'Request failed',
      details: e
    });
  }
};

/* [Is working as expected] */
export const getUserTotalHotspots = async (req, res) => {
  const { userId } = req.params;
  try {
    //Try to find to User specified by the userId
    const foundUser = await User.findById(userId);
    //If the User doesn't exist, handle it
    if (!foundUser) {
      return res.status(400).json({
        success: false,
        message: 'Requested User was not found, try checking user ID!'
      });
    }
    const query = { 'user.id': userId, parent: null, valid: true };
    const options = {
      limit: 10000
    };
    //Execute a query on the hotspots collection and
    //paginate the returned docs with the options above
    const { docs } = await Hotspot.paginate(query, options);
    if (docs) {
      let total = 0;
      docs.map(el => {
        total++;
      });
      return res.status(200).json({
        error: false,
        message: 'Request was successful',
        myHotspots: total
      });
    }
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: `Error when fetching hotspots from user with id - ${userId}`,
      details: e.message
    });
  }
};

export const getUserTotalComments = async (req, res) => {
  const { userId } = req.params;
  const query = { 'user.id': userId };
  const options = {
    limit: 100000
  };
  try {
    const { docs } = await _Comment.paginate(query, options);
    if (docs) {
      let total = 0;
      docs.map(el => {
        total++;
      });
      return res.status(200).json({
        success: true,
        message: 'Request was successful',
        myComments: total
      });
    }
    return res.status(200).json({
      message: 'No comments found'
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: 'Request failed'
    });
  }
};

export const getGenderRatio = async (req, res) => {
  const { userId } = req.params;
  try {
    const hotspots = await Hotspot.find({ 'user.id': userId });

    if (hotspots) {
      let maleViews = 0;
      let femaleViews = 0;
      let flag = true;
      hotspots.forEach((el, i) => {
        const hotspotId = el._id;
        View.find({ hotspot_id: hotspotId }, (err, views) => {
          if (err) {
            throw err;
          }
          views.forEach((view, j) => {
            User.findById(view.user_id, (err, user) => {
              if (err) {
                throw err;
              }
              if (user._id !== userId) {
                if (user.gender === 'male') {
                  maleViews++;
                } else {
                  femaleViews++;
                }
              }
              if (j === views.length - 1 && i === hotspots.length - 1) {
                return res.status(200).json({
                  success: true,
                  message: 'Request was successful',
                  maleViews,
                  femaleViews
                });
              }
            });
          });
        });
      });
    }
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'Request failed',
      details: e
    });
  }
};
