// Example: Student validation schema
const joi = require("joi");

const createStudentValidation = (data) => {
  const schema = joi.object({
    // firstName: joi.string().required(),
    // lastName: joi.string().required(),
    // email: joi.string().email().required(),
    // rollNumber: joi.string().required(),
    // batchId: joi.string().required(),
    // Example validation fields
  });

  return schema.validate(data);
};

const updateStudentValidation = (data) => {
  const schema = joi.object({
    // firstName: joi.string().optional(),
    // lastName: joi.string().optional(),
    // email: joi.string().email().optional(),
    // Example validation fields
  });

  return schema.validate(data);
};

module.exports = {
  createStudentValidation,
  updateStudentValidation,
};
