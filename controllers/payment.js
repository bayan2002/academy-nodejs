const CC = require("currency-converter-lt");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { serverErrs } = require("../middlewares/customError");
const { Wallet, Student, Session, Teacher } = require("../models");
const FinancialRecord = require("../models/financialRecord");
const { Notifications } = require("../firebaseConfig");
const sendEmail = require("../middlewares/sendEmail");

const charge = async (req, res) => {
  const { StudentId, price, currency } = req.body;
  let currencyConverter = new CC();

  const newPrice = await currencyConverter
    .from(currency)
    .to("OMR")
    .amount(+price)
    .convert();

  global.newPrice = newPrice;

  let url = "https://checkout.thawani.om/api/v1/checkout/session";

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "thawani-api-key": "V27floHDuAQzb4fVaAT2isXTtSbcqm",
    },
    body: `{"client_reference_id":"123412","mode":"payment","products":[{"name":"product 1","quantity":1,"unit_amount":${
      newPrice * 1000
    }}],"success_url":"https://moalime.com/success-charge","cancel_url":"https://moalime.com/fail-charge","metadata":{"Customer name":"somename","order id":0}}`,
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
    data: `https://checkout.thawani.om/pay/${data.data.session_id}?key=LmFvwxjsXqUb3MeOCWDPCSrAjWrwit`,
    msg: { arabic: "تم شحن المبلغ", english: "charged" },
  });
};

const checkoutSuccess = async (req, res) => {
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "thawani-api-key": "V27floHDuAQzb4fVaAT2isXTtSbcqm",
    },
  };

  let url = `https://checkout.thawani.om/api/v1/checkout/session/${global.session_id}`;

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
    msg: { arabic: "تم الدفع بنجاح", english: "successful charging" },
  });
};

const booking = async (req, res) => {
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

  const converterPrice = await currencyConverter
    .from(currency)
    .to("OMR")
    .amount(+totalPrice)
    .convert();

  const newPrice = converterPrice.toFixed(2);

  global.newPrice = newPrice;
  if (typeOfPayment == "thawani") {
    let url = "https://checkout.thawani.om/api/v1/checkout/session";

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "thawani-api-key": "V27floHDuAQzb4fVaAT2isXTtSbcqm",
      },
      body: `{"client_reference_id":"123412","mode":"payment","products":[{"name":"product 1","quantity":1,"unit_amount":${
        newPrice * 1000
      }}],"success_url":"https://moalime.com/success-payment","cancel_url":"https://moalime.com/fail-payment","metadata":{"Customer name":"somename","order id":0}}`,
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
      data: `https://checkout.thawani.om/pay/${global.session_id}?key=LmFvwxjsXqUb3MeOCWDPCSrAjWrwit`,
      msg: {
        arabic: "تم الحجز من خلال ثواني",
        english: "booking with thawani",
      },
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

    await FinancialRecord.create({
      amount: newPrice,
      type: "booking",
    });

    const teacher = await Teacher.findOne({
      where: {
        id: TeacherId,
      },
    });

    teacher.totalAmount += +newPrice * 0.8;
    teacher.bookingNumbers += 1;
    teacher.hoursNumbers += +session.period;
    await teacher.save();

    await Notifications.add({
      titleAR: `تم حجز الدرس من الطالب ${student.name}`,
      titleEn: `booking successfully from student ${student.name}`,
      TeacherId,
      seen: false,
      date: Date.now(),
    });

    const mailOptions = {
      from: "info@moalime.com",
      to: student.email,
      subject: "منصة معلمي: التأكيد - جلستك مع المعلم",
      html: `<div>عزيزي ${student.name},<br>
      تمت جدولة جلستك مع معلمك ${teacher.name} بنجاح.
      ستتم جلستك في ${session.date} وستنعقد ${session.type}.<br>
      يسعدنا أنك بادرت بحجز هذه الجلسة ، ونحن على ثقة من أنها ستكون 
       .مفيدة لتقدمك الأكاديمي<br>.هذه الجلسة هي فرصة ممتازة لك لمناقشة أي أسئلة أو مخاوف قد تكون لديك مع معلمك وتلقي إرشادات حول أدائك الأكاديمي<br>
       ,حظ سعيد<br>
      فريق معلمي
      </div> `,
    };
    sendEmail(mailOptions);

    const mailOption = {
      from: "info@moalime.com",
      to: teacher.email,
      subject: "منصة معلمي: تأكيد الحجز الناجح للجلسة",
      html: `<div>عزيزي ${teacher.name},<br>
      أكتب لأؤكد أن ${student.name} قد حجز جلسة معك بنجاح. تم تحديد موعد الجلسة في ${session.date}.<br>
      يتطلع ${student.name} حقًا إلى الجلسة وهو متحمس للتعلم منك. <br>
      نحن نقدر فرصة التعلم من 
      مدرس ذو معرفة وخبرة مثلك.<br>
      حظ سعيد,<br>
      فريق معلمي
      </div> `,
    };
    sendEmail(mailOption);

    res.send({
      status: 201,
      data: session,
      msg: {
        arabic: "تم الدفع من خلال المحفظة",
        english: "booking with wallet",
      },
    });
  }
};

const bookingSuccess = async (req, res) => {
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "thawani-api-key": "V27floHDuAQzb4fVaAT2isXTtSbcqm",
    },
  };

  let url = `https://checkout.thawani.om/api/v1/checkout/session/${global.session_id}`;

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
  await FinancialRecord.create({
    amount: session.price,
    type: "booking",
  });

  const teacher = await Teacher.findOne({
    where: {
      id: session.TeacherId,
    },
  });

  teacher.totalAmount += +session.price * 0.8;
  teacher.bookingNumbers += 1;
  teacher.hoursNumbers += +session.period;
  await teacher.save();

  const student = await Student.findOne({
    where: {
      id: StudentId,
    },
  });

  await Notifications.add({
    titleAR: `تم حجز الدرس من الطالب ${student.name}`,
    titleEn: `booking successfully from student ${student.name}`,
    TeacherId,
    seen: false,
    date: Date.now(),
  });
  const mailOptions = {
    from: "info@moalime.com",
    to: student.email,
    subject: "منصة معلمي: التأكيد - جلستك مع المعلم",
    html: `<div>عزيزي ${student.name},<br>
      تمت جدولة جلستك مع معلمك ${teacher.name} بنجاح.
      ستتم جلستك في ${session.date} وستنعقد ${session.type}.<br>
      يسعدنا أنك بادرت بحجز هذه الجلسة ، ونحن على ثقة من أنها ستكون 
       .مفيدة لتقدمك الأكاديمي<br>.هذه الجلسة هي فرصة ممتازة لك لمناقشة أي أسئلة أو مخاوف قد تكون لديك مع معلمك وتلقي إرشادات حول أدائك الأكاديمي<br>
       ,حظ سعيد<br>
      فريق معلمي
      </div> `,
  };
  sendEmail(mailOptions);

  const mailOption = {
    from: "info@moalime.com",
    to: teacher.email,
    subject: "منصة معلمي: تأكيد الحجز الناجح للجلسة",
      html: `<div>عزيزي ${teacher.name},<br>
      أكتب لأؤكد أن ${student.name} قد حجز جلسة معك بنجاح. تم تحديد موعد الجلسة في ${session.date}.<br>
      يتطلع ${student.name} حقًا إلى الجلسة وهو متحمس للتعلم منك. <br>
      نحن نقدر فرصة التعلم من 
      مدرس ذو معرفة وخبرة مثلك.<br>
      حظ سعيد,<br>
      فريق معلمي
      </div> `,
  };
  sendEmail(mailOption);
  res.send({
    status: 201,
    data: session,
    msg: {
      arabic: "تم الدفع بنجاح من خلال منصة ثواني",
      english: "successful booking from thawani",
    },
  });
};

module.exports = { charge, checkoutSuccess, booking, bookingSuccess };
