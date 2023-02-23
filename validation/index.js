const yup = require("yup");

const validateTeacherEmail = yup.object().shape({
  email: yup.string().required().email(),
});

const validateAdminEmail = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

const loginValidation = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

module.exports = { validateTeacherEmail, validateAdminEmail, loginValidation };
