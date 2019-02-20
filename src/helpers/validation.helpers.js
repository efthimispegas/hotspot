import Joi from 'joi';

export const validateBody = schema => {
  return (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json({
        error: true,
        message: 'There was a problem in validation',
        details: {
          message: result.error.details[0].message,
          path: result.error.details[0].path[0]
        }
      });
    }
    if (!req.value) {
      req.value = {};
    }
    req['body'] = result.value;
    next();
  };
};

export const signupSchema = Joi.object().keys({
  email: Joi.string()
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    )
    .required(),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,25}$/)
    .required(),
  username: Joi.string()
    .regex(/^(.*[a-zA-Z\d].{4,25})/)
    .required(),
  fullname: Joi.string(),
  birthday: Joi.date(),
  city: Joi.string().required(),
  gender: Joi.string().required(),
  avatar: Joi.string()
});

export const loginSchema = Joi.object().keys({
  email: Joi.string()
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    )
    .required(),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,25}$/)
    .required()
});

export const object3DSchema = Joi.object().keys({
  text: Joi.string(),
  location: {
    latitude: Joi.number().required(),
    longitude: Joi.number().required()
  },
  validity: Joi.number().required(),
  user: {
    id: Joi.string().required(),
    username: Joi.string().required()
  },
  obj: Joi.object()
});
