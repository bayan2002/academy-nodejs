const Rate = require("../models/Rates");

const rateTeacher = async()=> {
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


module.exports = rateTeacher;