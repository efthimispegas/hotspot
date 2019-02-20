import { User } from '../models';
import { createToken } from '../utils/createToken';

export const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.status(400).json({
        error: true,
        message: `Requested user with id - ${userId} could not be found!`
      });
    }

    return res.status(200).json({
      success: true,
      message: `Requested user with id - ${userId} was found!`,
      user: foundUser
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'Error with fetching user',
      details: e
    });
  }
};

export const signup = async (req, res) => {
  const { email, avatar } = req.body;
  console.log('===============');
  console.log('req.body:', req.body);
  console.log('===============');
  try {
    //check if the user already exists
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(403).json({
        error: true,
        message: 'Email is already in use'
      });
    }

    //create the new user
    const user = new User({ ...req.body, avatar: { uri: avatar } });
    await user.save(function(err) {
      if (err) {
        console.log(err);
        throw new Error(err);
      }
    });
    //generate token for the new user
    const token = createToken(user);
    //save the newly created user and respond to the client with the token
    return res.status(200).json({
      success: true,
      message: `User with id - ${user.id} was created!`,
      user,
      token: `Bearer ${token}`
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'Error with registering user',
      details: e.message
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    //if we don't find the user, handle it
    if (!foundUser) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    // if we found him, then create token and login
    console.log('===============');
    console.log('req.user:', req.user);
    console.log('===============');
    const token = createToken(foundUser);
    return res.status(200).json({
      success: true,
      user: foundUser,
      token: `Bearer ${token}`
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: "Something went wrong with user's auth",
      details: e
    });
  }
};

export const googleOAuth = async (req, res) => {
  try {
    // console.log('===============');
    // console.log('[UserController]:', req.user);
    // console.log('===============');

    const token = createToken(req.user);
    return res.status(201).json({
      success: true,
      message: 'User logged in successfully with googleOAuth',
      token: `Bearer ${token}`
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'Error with googleOAuth',
      details: e.message
    });
  }
};

export const facebookOAuth = async (req, res) => {
  try {
    console.log('===============');
    console.log('[UserController]:', req.user);
    console.log('===============');
    const token = createToken(req.user);
    return res.status(201).json({
      success: true,
      message: 'User logged in successfully with facebookOAuth',
      token: `Bearer ${token}`
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'Error with facebookOAuth',
      details: e.message
    });
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  console.log('===============');
  console.log('user: \n', req.body);
  console.log('===============');
  const update = req.body;
  const options = {
    returnNewDocument: true,
    new: true,
    upsert: true,
    runValidators: true
  };
  try {
    await User.findByIdAndUpdate(userId, update, options, function(
      err,
      result
    ) {
      if (err) {
        return res.status(400).json({
          success: false,
          messsage: `Error when trying and update user with id - ${userId}. Check the new values!`,
          details: err
        });
      }
      return res.status(200).json({
        success: true,
        message: `User with id - ${userId} was updated!`,
        user: result
      });
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'Error with updating user',
      details: e
    });
  }
};

export const getAllUsers = async (req, res) => {
  const { email } = req.body;

  try {
    return res.status(200).json({
      users: await User.find()
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'Error with getting all users',
      details: e
    });
  }
};
