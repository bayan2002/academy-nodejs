const jwt = require('jsonwebtoken');
const { Parent, Student, Teacher } = require('../models');
const { loginValidation } = require('../validation');
const { compare } = require("bcrypt");
const generateToken = require('./generateToken');

const login = async (req, res) => {
    const { email, password } = req.body;
  
    await loginValidation.validate({ email, password });
  
    const parent = await Parent.findOne({ where: { email } });
  
    const student = await Student.findOne({ where: { email } });
  
    const teacher = await Teacher.findOne({ where: { email } });
  
    const result = await compare(password, parent?.password || student?.password || teacher?.password);
    if (!result) throw serverErrs.BAD_REQUEST("Wrong Email Or Password");
  
    const role = teacher ? "teacher" : student ? "student" : "parent"
    const data = teacher ? teacher : student ? student : parent
    const token = await generateToken({ userId: data.id, name: data.name, role });

    res.cookie("token", token);
    res.send({ status: 201, data: data, msg: "successful log in" });
  };

  module.exports = login