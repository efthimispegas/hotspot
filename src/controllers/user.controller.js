import User from '../models/user';
import { createToken } from '../utils/createToken';

export const loginWithAuth0 = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.create({ email });
    //return 201 for creation
    return res.status(201).json({
      success: true,
      user,
      token: `JWT ${createToken(user)}`
    });
  } catch (e) {
    return res.status(e.status).json({
      error: true,
      message: "Something went wrong with user's auth",
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
