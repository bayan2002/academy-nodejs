const express = require("express");
const charge = require("../controllers/payment");

const paymentRouter = express.Router();

paymentRouter.post("charge", charge);

module.exports = paymentRouter;
