const Joi = require('joi');

// generic middleware factory for validating req.body against a schema
function validate(schema) {
  return (req, res, next) => {
    const options = { abortEarly: false, allowUnknown: true };  // options to collect all errors, allow extra fields
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      // joi error details can be concatenated
      const errors = error.details.map(d => d.message).join(', ');
      return res.status(400).json({ message: "Validation error: " + errors });
    }
    req.body = value;  // use the validated values (with any trims/coercions applied)
    next();
  };
}

module.exports = validate;
