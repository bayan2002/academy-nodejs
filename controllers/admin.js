const { Admin, Level } = require("../models");
const { validateAdminSignUp, loginValidation } = require("../validation");
const { serverErrs } = require("../middlewares/customError");
const { compare, hash } = require("bcrypt");
const generateToken = require("../middlewares/generateToken");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  await validateAdminSignUp.validate({ name, email, password });
  const admin = await Admin.findOne({
    where: {
      email,
    },
  });
  if (admin) throw serverErrs.BAD_REQUEST("email is already used");

  const hashedPassword = await hash(password, 12);

  const newAdmin = await Admin.create(
    {
      name,
      email,
      password: hashedPassword,
    },
    {
      returning: true,
    }
  );
  await newAdmin.save();
  const { id } = newAdmin;
  const token = await generateToken({ userId: id, name });

  res.cookie("token", token);

  res.send({ status: 201, data: newAdmin, msg: "successful sign up" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  await loginValidation.validate({ email, password });

  const admin = await Admin.findOne({ where: { email } });
  if (!admin) throw serverErrs.BAD_REQUEST("Wrong Email Or Password");

  const result = await compare(password, admin.password);
  if (!result) throw serverErrs.BAD_REQUEST("Wrong Email Or Password");

  const { id, name } = admin;

  const token = await generateToken({ userId: id, name, role: "admin" });
  res.cookie("token", token);

  res.send({ status: 201, data: admin, msg: "successful log in" });
};

const getLevels = async (req, res) => {
  const levels = await Level.findAll();
  res.send({ status: 201, data: levels, msg: "successful get all levels" });
};

module.exports = { signUp, login, getLevels };
