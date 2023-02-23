const nodemailer=  require('nodemailer');
const dotenv =require('dotenv');

dotenv.config();
const sendEmail = (email, code) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'modarby0@gmail.com',
    to: email,
    subject: 'Modarby platform: Your Verification Code',
    html: `<div>Welcome, <br>Thank you so much for taking time to joining us </b>
    We are happy to let you know that your account have been created.<br>
    To verify your Account enter the code please!<br>
    <b> ${code} </b>
    Good luck,<br>
    Modarby Team
    </div> `,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    } else {
      return '';
    }
  });
};

module.exports=  sendEmail;
