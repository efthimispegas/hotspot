import Hotspot from '../models/hotspot';

export const createHotspot = async (req, res) => {
  const { title, description } = req.body;
  const newHotspot = new Hotspot({ title, description });

  /**
   * Validation checks
   */
  if (!title) {
    return res
      .status(400)
      .json({ error: true, message: 'A title is required!' });
  } else if (typeof title !== 'string') {
    return res
      .status(400)
      .json({ error: true, message: 'The title must be a string!' });
  } else if (title.length < 3) {
    return res.status(400).json({
      error: true,
      message: 'Who are you kidding?! No title is that short...'
    });
  }

  if (!description) {
    return res
      .status(400)
      .json({ error: true, message: 'A description is required!' });
  } else if (typeof description !== 'string') {
    return res
      .status(400)
      .json({ error: true, message: 'The description must be a string!' });
  } else if (description.length < 10) {
    return res
      .status(400)
      .json({ error: true, message: 'Please be a little more informative..' });
  }

  try {
    //return 201 for creation
    return res.status(201).json({ hotspot: await newHotspot.save() });
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
