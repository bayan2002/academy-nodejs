const yup = require("yup");

const validateTeacher = yup.object().shape({
  email: yup.string().required().email(),
});

const validateStudent = yup.object().shape({
  email: yup.string().required().email(),
  name: yup.string().required(),
  location: yup.string().required(),
});

const validateAdminSignUp = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().length(4),
});

const validateParentSignUp = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().length(4),
});

const loginValidation = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().length(4),
});
const validateMessage = Joi.object({
  receiverId: Joi.number().min(1).required(),
  message: Joi.string().required(),
});

module.exports = {
  validateTeacher,
  validateAdminSignUp,
  loginValidation,
  validateParentSignUp,
  validateStudent,
  validateMessage,
};
