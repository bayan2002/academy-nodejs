const express = require("express");
const {charge, checkoutSuccess, booking} = require("../controllers/payment");

const paymentRouter = express.Router();

paymentRouter.post("/charge", charge);
paymentRouter.post("/successCheckout", checkoutSuccess);
paymentRouter.post("/booking", booking);

module.exports = paymentRouter;
