const nodemailer=  require('nodemailer');
const dotenv =require('dotenv');

dotenv.config();
const sendEmail = (mailOptions) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_EMAIL_PASSWORD,
    },
  });


  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    } else {
      return '';
    }
  });
};

module.exports=  sendEmail;
