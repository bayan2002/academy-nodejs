const express = require("express");
const {charge, checkoutSuccess} = require("../controllers/payment");

const paymentRouter = express.Router();

paymentRouter.post("/charge", charge);
paymentRouter.post("/successCheckout", checkoutSuccess);

module.exports = paymentRouter;
