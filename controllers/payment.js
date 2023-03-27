const CC = require("currency-converter-lt");
const fetch = require("node-fetch");
const { serverErrs } = require("../middlewares/customError");
const { Wallet } = require("../models");

const charge = async () => {
  const { studentId, price, currency } = req.body;
  let currencyConverter = new CC();

  const newPrice = await currencyConverter
    .from(currency)
    .to("ORM")
    .amount(+price)
    .convert();

  let url = "https://uatcheckout.thawani.om/api/v1/checkout/session";

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "thawani-api-key": "rRQ26GcsZzoEhbrP2HZvLYDbn9C9et",
    },
    body: `{"client_reference_id":"123412","mode":"payment","products":[{"name":"product 1","quantity":1,"unit_amount":${
      newPrice * 1000
    }}],"success_url":"https://acacdemy.vercel.app/success-charge","cancel_url":"https://acacdemy.vercel.app/fail-charge","metadata":{"Customer name":"somename","order id":0}}`,
  };

  const data = await fetch(url, options);
  global.session_id = data.data.session_id;
  if (data.success && data.code === 2004) {
    const charging = await Wallet.create({
      studentId,
      price,
      currency,
      isPaid: false,
    });
  } else {
    throw serverErrs.BAD_REQUEST("charge didn't succeed");
  }

  res.send({
    status: 201,
    data: `https://uatcheckout.thawani.om/pay/${data.data.session_id}?key=HGvTMLDssJghr9tlN9gr4DVYt0qyBy`,
    msg: "successful charging",
  })
};

module.exports = charge;
