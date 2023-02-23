const yup = require("yup");

const validateTeacherEmail = yup.object().shape({
  email: yup.string().required().email(),
});

const validateAdminSignUp = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

const validateParentSignUp = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
  image: yup.string(),
  // image: yup.string().required().url(), // need to review
});

const loginValidation = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

module.exports = {
  validateTeacherEmail,
  validateAdminSignUp,
  loginValidation,
  validateParentSignUp,
};
