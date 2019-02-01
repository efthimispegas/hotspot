import mongo from 'mongodb';

//limit of the returned docs from the query
const LIMIT = 10;

export const querySetup = req => {
  let limit = req.query.limit !== undefined ? parseInt(req.query.limit) : LIMIT;
  const page = req.query.page !== undefined ? parseInt(req.query.page) : 0;
  const offset = page ? limit * page - 1 : 0;
  return { limit, page, offset };
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
