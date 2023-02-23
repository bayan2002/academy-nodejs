const yup = require('yup');

const validateTeacherEmail = yup.object().shape({
  email: yup.string().required().email(),
});

module.exports = validateTeacherEmail;