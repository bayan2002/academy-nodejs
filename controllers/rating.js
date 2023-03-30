const { Teacher } = require("../models");
const Rate = require("../models/Rates");

const rateTeacher = async(req,res)=> {
const {studentId, TeacherId, rating, comment} = req.body;

const rate = await Rate.create({
  studentId, TeacherId, rating, comment
})

const teacherRate = await Teacher.findOne({
  where: {
    id: TeacherId
  }
})

res.send({
  status: 201,
  data: rate,
  msg: "successful rate teacher",
});

}

const getTeacherRate = async(req,res) => {
  const {TeacherId} = req.body
const rates = await Rate.findAll({
  where:{
    TeacherId
  }
})

res.send({
  status: 201,
  data: rates,
  msg: "successful get teacher rate",
});

}


module.exports = {rateTeacher, getTeacherRate};