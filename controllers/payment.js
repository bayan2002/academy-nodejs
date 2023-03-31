const CC = require("currency-converter-lt");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { serverErrs } = require("../middlewares/customError");
const { Wallet, Student, Session } = require("../models");

const charge = async (req,res) => {
  const { StudentId, price, currency } = req.body;
  let currencyConverter = new CC();

  const newPrice = await currencyConverter
    .from(currency)
    .to("OMR")
    .amount(+price)
    .convert();

  global.newPrice = newPrice;

  let url = "https://uatcheckout.thawani.om/api/v1/checkout/session";

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "thawani-api-key": "rRQ26GcsZzoEhbrP2HZvLYDbn9C9et",
    },
    body: `{"client_reference_id":"123412","mode":"test","products":[{"name":"product 1","quantity":1,"unit_amount":${
      newPrice * 1000
    }}],"success_url":"http://localhost:3000/success-charge","cancel_url":"http://localhost:3000/fail-charge","metadata":{"Customer name":"somename","order id":0}}`,
  };

  const response = await fetch(url, options);
  const data = await response.json();
  if (data.success && data.code === 2004) {
    global.session_id = data.data.session_id;
    const charging = await Wallet.create({
      StudentId,
      price,
      currency,
      isPaid: false,
      typeAr: "إيداع",
      typeEn: "deposit",
      sessionId: global.session_id,
    });
  } else {
    throw serverErrs.BAD_REQUEST("charge didn't succeed");
  }

  res.send({
    status: 201,
    data: `https://uatcheckout.thawani.om/pay/${data.data.session_id}?key=HGvTMLDssJghr9tlN9gr4DVYt0qyBy`,
    msg: "charged",
  });
};

const checkoutSuccess = async (req,res) => {
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "thawani-api-key": "rRQ26GcsZzoEhbrP2HZvLYDbn9C9et",
    },
  };

  let url = `https://uatcheckout.thawani.om/api/v1/checkout/session/${global.session_id}`;

  const response = await fetch(url, options);
  const data = await response.json();

  if (data.data.payment_status != "paid") {
    throw serverErrs.BAD_REQUEST("charge didn't pay");
  }

  const wallet = await Wallet.findOne({
    where: {
      sessionId: global.session_id,
    },
  });
  const { StudentId } = wallet;

  wallet.isPaid = true;
  await wallet.save();

  global.session_id = null;

  const student = await Student.findOne({
    where: {
      id: StudentId,
    },
  });

  student.wallet += +global.newPrice;
  await student.save();
  global.newPrice = null;

  res.send({
    status: 201,
    data: student,
    msg: "successful charging",
  });
};

const booking = async (req,res) => {
  const createSession = async () => {
    const session = await Session.create({
      title,
      StudentId,
      TeacherId,
      price,
      currency,
      typeOfPayment,
      type,
      date,
      period,
      totalPrice,
    });
    return session;
  };
  const createWallet = async () => {
    const wallet = await Wallet.create({
      StudentId,
      price: totalPrice,
      currency,
      typeAr: "سحب",
      typeEn: "withdraw",
    });
    return wallet;
  };
  const {
    title,
    StudentId,
    TeacherId,
    price,
    currency,
    typeOfPayment,
    type,
    date,
    period,
  } = req.body;
  const totalPrice = +price * period;
  let currencyConverter = new CC();

  const newPrice = await currencyConverter
    .from(currency)
    .to("OMR")
    .amount(+totalPrice)
    .convert();

  global.newPrice = newPrice;
  if (typeOfPayment == "thawani") {
    let url = "https://uatcheckout.thawani.om/api/v1/checkout/session";

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "thawani-api-key": "rRQ26GcsZzoEhbrP2HZvLYDbn9C9et",
      },
      body: `{"client_reference_id":"123412","mode":"test","products":[{"name":"product 1","quantity":1,"unit_amount":${
        newPrice * 1000
      }}],"success_url":"http://localhost:3000/success-payment","cancel_url":"http://localhost:3000/fail-payment","metadata":{"Customer name":"somename","order id":0}}`,
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.success && data.code === 2004) {
      global.session_id = data.data.session_id;
      const session = await createSession();
      session.sessionId = global.session_id;
      await session.save();
    } else {
      throw serverErrs.BAD_REQUEST("charge didn't succeed");
    }
    res.send({
      status: 201,
      data: `https://uatcheckout.thawani.om/pay/${global.session_id}?key=HGvTMLDssJghr9tlN9gr4DVYt0qyBy`,
      msg: "charged with thawani",
    });
  } else if (typeOfPayment == "wallet") {
    const student = await Student.findOne({
      where: {
        id: StudentId,
      },
    });
    if (+student.wallet < +newPrice) {
      throw serverErrs.BAD_REQUEST(
        "your current wallet is less than the required price"
      );
    }
    const session = await createSession();
    session.isPaid = true;
    await session.save();
    const wallet = await createWallet();
    wallet.isPaid = true;
    await wallet.save();
    student.wallet -= +newPrice;
    await student.save();
    res.send({
      status: 201,
      data: session,
      msg: "charged with wallet",
    });
  }
};

const bookingSuccess = async (req,res) => {
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "thawani-api-key": "rRQ26GcsZzoEhbrP2HZvLYDbn9C9et",
    },
  };

  let url = `https://uatcheckout.thawani.om/api/v1/checkout/session/${global.session_id}`;

  const response = await fetch(url, options);
  const data = await response.json();

  if (data.data.payment_status != "paid") {
    throw serverErrs.BAD_REQUEST("payment didn't succeed");
  }

  const session = await Session.findOne({
    where: {
      sessionId: global.session_id,
    },
  });
  const { StudentId } = session;

  session.isPaid = true;
  await session.save();

  global.session_id = null;

  res.send({
    status: 201,
    data: session,
    msg: "successful booking",
  });
};

module.exports = { charge, checkoutSuccess, booking, bookingSuccess };
