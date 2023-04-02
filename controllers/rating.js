const { serverErrs } = require("../middlewares/customError");
const { Teacher, Session } = require("../models");
const Rate = require("../models/Rate");
const { Sequelize }= require('sequelize');

const rateTeacher = async (req, res) => {
  const { StudentId, TeacherId, rating, comment } = req.body;

  const teacher = await Teacher.findOne({
    where: {
      id: TeacherId,
    },
  });

  const session = await Session.findOne({
    where: {
      TeacherId,
      StudentId,
    },
  });

  // if (!session)
  //   throw serverErrs.BAD_REQUEST("You don't have any session with the teacher");

  const rateData = await Rate.findOne({
    where: {
      TeacherId,
      StudentId,
    },
  });

  // if (rateData) throw serverErrs.BAD_REQUEST("You already Rated the teacher ");

  const rate = await Rate.create({
    StudentId,
    TeacherId,
    rating,
    comment,
  });

  const rates = await Rate.findAll({
    where: {
      TeacherId,
    },
  attributes: [
    [Sequelize.fn('AVG', Sequelize.col('rating')), 'avg_rating']
  ]
  });

  console.log(rates)

  const avgRating = rates[0].dataValues.avg_rating;
  const ratingFromZeroToFive = Math.round((avgRating / 10) * 5);

  console.log(ratingFromZeroToFive, 'hhhhhhhhhhh')
  // const teacherRates = 0;

  // for(let i = 0 ; i<rates.length ; ++i){
  //   teacherRates += rates[i].rating;
  // }

  // teacher.rate = teacherRates / rates.length;
  // await teacher.save();

  res.send({
    status: 201,
    data: rate,
    msg: "successful rate teacher",
  });
};

const getTeacherRate = async (req, res) => {
  const { TeacherId } = req.body;
  const rates = await Rate.findAll({
    where: {
      TeacherId,
    },
  });

  res.send({
    status: 201,
    data: rates,
    msg: "successful get teacher rate",
  });
};

module.exports = { rateTeacher, getTeacherRate };
