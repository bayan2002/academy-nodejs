const yup = require("yup");

const validateTeacherEmail = yup.object().shape({
  email: yup.string().required().email(),
});
const validateStudent = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().length(4),
});

module.exports = { validateTeacherEmail, validateStudent };
