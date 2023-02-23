const yup = require("yup");

const validateTeacherEmail = yup.object().shape({
  email: yup.string().required().email(),
});
const validateStudent = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().length(4),
});

const validateAdminSignUp = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(4),
});

const validateParentSignUp = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(4),
  image: yup.string(),
  // image: yup.string().required().url(), // need to review
});

const loginValidation = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(4),
});

module.exports = {
  validateTeacherEmail,
  validateAdminSignUp,
  loginValidation,
  validateParentSignUp,
  validateStudent,
};
