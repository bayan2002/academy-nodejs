const { Teacher } = require('../models');
const validateTeacherEmail = require('../validation')
const {serverErrs} = require('../middlewares/customError');
const generateRandomCode = require('../middlewares/generateCode');
const sendEmail = require('../middlewares/sendEmail');
const { compare, hash } = require('bcrypt');
const generateToken = require('../middlewares/generateToken');


const signUp = async(req, res)=> {
const {email} = req.body;
await validateTeacherEmail.validate({email});
const teacher = await Teacher.findOne({
  where: {
    email,
    isRegister: true
  },
});
if (teacher) throw serverErrs.BAD_REQUEST('email is already used');

 const code = generateRandomCode();
const newTeacher = await Teacher.create({
  email,
  registerCode: code
})
 await newTeacher.save();

 sendEmail(email, code);
}

const verifyCode = async(req, res)=> {
const {registerCode, email} = req.body;

const teacher = await Teacher.findOne({
  where: {
    email,
  },
});
if (!teacher) throw serverErrs.BAD_REQUEST('email not found');
if(teacher.isRegister) throw serverErrs.BAD_REQUEST('email is already used');
if(teacher.registerCode !== registerCode) throw serverErrs.BAD_REQUEST('code is wrong')

await teacher.update({isRegister : true})
 
}

const signPassword = async(req, res)=> {
const {email, password} = req.body;

const teacher = await Teacher.findOne({
  where: {
    email,
  },
});
if (!teacher) throw serverErrs.BAD_REQUEST('email not found');
if(teacher.isRegister) throw serverErrs.BAD_REQUEST('email is already used');
const hashedPassword = await hash(password, 12);

await teacher.update({password: hashedPassword});
await teacher.save();

const token = await generateToken({ userId: teacher.id});

  res.cookie('token', token);
  res.send({ status: 201, data: teacher, msg: 'successful sign up'});

}

module.exports = {signUp, verifyCode, signPassword};