const { Parent } = require("../models");
const { validateParentSignUp, loginValidation } = require("../validation");
const { serverErrs } = require("../middlewares/customError");
const { compare, hash } = require("bcrypt");
const generateToken = require("../middlewares/generateToken");

const signUp = async (req, res) => {
  const { name, email, password, image } = req.body;
  await validateParentSignUp.validate({ name, email, password, image });
  const parent = await Parent.findOne({
    where: {
      email,
    },
  });

  const teacher = await Teacher.findOne({
    where: {
      email,
      isRegistered: true,
    },
  });

  const student = await Student.findOne({
    where: {
      email,
    },
  });
  if (parent) throw serverErrs.BAD_REQUEST("email is already used");
  if (teacher) throw serverErrs.BAD_REQUEST("email is already used");
  if (student) throw serverErrs.BAD_REQUEST("email is already used");

  const hashedPassword = await hash(password, 12);

  const newParent = await Parent.create(
    {
      name,
      email,
      password: hashedPassword,
      image,
    },
    {
      returning: true,
    }
  );
  await newParent.save();
  const { id } = newParent;
  const token = await generateToken({ userId: id, name });

  res.cookie("token", token);

  res.send({ status: 201, data: newParent, msg: "successful sign up" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  await loginValidation.validate({ email, password });

  const parent = await Parent.findOne({ where: { email } });
  if (!parent) throw serverErrs.BAD_REQUEST("Wrong Email Or Password");

  const result = await compare(password, parent.password);
  if (!result) throw serverErrs.BAD_REQUEST("Wrong Email Or Password");

  const { id, name } = parent;

  const token = await generateToken({ userId: id, name, role: "parent" });
  res.cookie("token", token);

  res.send({ status: 201, data: parent, msg: "successful log in" });
};

module.exports = { signUp, login };
