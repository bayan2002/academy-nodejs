const Rate = require("../models/Rates");

const rateTeacher = async(req,res)=> {
const {studentId, TeacherId, rating, comment} = req.body;

const rate = await Rate.create({
  studentId, TeacherId, rating, comment
})

res.send({
  status: 201,
  data: rate,
  msg: "successful rate teacher",
});

}

const getTeacherRate = async(req,res) => {
  const {teacherId} = req.body
const rates = await Rate.findAll({
  where:{
    TeacherId : teacherId
  }
})


}


module.exports = rateTeacher;