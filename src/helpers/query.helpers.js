import mongo from 'mongodb';

//max limit of the returned docs from the query
const LIMIT = 100;
const MAX_LIMIT = 10000;

export const querySetup = req => {
  let limit = req.query.limit !== undefined ? parseInt(req.query.limit) : LIMIT;
  const page = req.query.page !== undefined ? parseInt(req.query.page) : 1;
  const offset = page ? limit * (page - 1) : 0;
  
  if (limit > MAX_LIMIT) {
    limit = MAX_LIMIT;
  }
  if (limit < 1) {
    throw 'invalid limit';
  }
  if (page < 1) {
    throw 'invalid page number';
  }

  return { limit, offset };
};

export const createId = (id, res) => {
  try {
    return new mongo.ObjectID(id);
  } catch (e) {
    return res.status(400).json({
      error: true,
      message:
        'Error with creating new id! Check whether the provided id is valid.',
      details: e
    });
  }
};
