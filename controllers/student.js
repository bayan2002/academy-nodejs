const { Student } = require("../models");
const { validateStudent } = require("../validation");
const { serverErrs } = require("../middlewares/customError");
const { compare, hash } = require("bcrypt");
const generateToken = require("../middlewares/generateToken");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  await validateStudent.validate({ email, password });
  const student = await Student.findOne({
    where: {
      email,
      isRegistered: true,
    },
  });
  if (student) throw serverErrs.BAD_REQUEST("email is already used");
  const hashedPassword = await hash(password, 12);

  const newStudent = await Student.create({
    email,
    password: hashedPassword,
  });
  await newStudent.save();
  const token = await generateToken({ userId: teacher.id });

  res.cookie("token", token);
  res.send({ status: 201, data: teacher, msg: "successful sign up" });
};

module.exports = { signUp };
