const Joi = require('@hapi/joi');

// User Signup Validation with Joi
const signupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(), // Adjust minimum length as needed
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  console.log('hi')

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};



exports.validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
