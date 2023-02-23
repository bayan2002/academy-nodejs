const { Admin } = require("../models");
const { validateAdminEmail, loginValidation } = require("../validation");
const { serverErrs } = require("../middlewares/customError");
const { compare, hash } = require("bcrypt");
const generateToken = require("../middlewares/generateToken");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  await validateAdminEmail.validate({ name, email, password });
  const admin = await Admin.findOne({
    where: {
      email,
    },
  });
  if (admin) throw serverErrs.BAD_REQUEST("email is already used");

  const newAdmin = await Admin.create({
    name,
    email,
    password,
  });
  await newAdmin.save();
};

const login = async (req, res) => {
  const { email, password } = req.body;

  await loginValidation.validate({ email, password });

  const admin = await Admin.findOne({ where: { email } });
  if (!admin) throw serverErrs.BAD_REQUEST("Wrong Email Or Password");

  const result = await compare(password, admin.password);
  if (!result) throw serverErrs.BAD_REQUEST("Wrong Email Or Password");

  const { id, name } = admin;

  const token = await generateToken({ userID: id, name });
  res.cookie("token", token);

  return {
    status: 200,
    msg: "logged in successfully",
    data: { userID: id, name },
  };
};

module.exports = { signUp, login };
