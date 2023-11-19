const { google } = require("googleapis");
const nodemailer = require("nodemailer");

/*POPULATE BELOW FIELDS WITH YOUR CREDETIALS*/

const CLIENT_ID = "250216999612-a06hluqqf48ov1a13luh934u2aobh0t4.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REFRESH_TOKEN = "1//04r0cvQIPaglSCgYIARAAGAQSNwF-L9Irb4QgTWuSqyfuBVVA3zKICL7pstDlK-SlTZ0d99Oz3_3lM8TNwsJSzquH2fkl6f3dmvM";
const REDIRECT_URI = "https://developers.google.com/oauthplayground"; //DONT EDIT THIS
const MY_EMAIL = "kieuthanhphat.2003.2018hdb@gmail.com";
const Server = process.env.SERVER || 'http://localhost:3000' 
/*POPULATE ABOVE FIELDS WITH YOUR CREDETIALS*/

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


const sendTestEmail = async (to, token) => {
  const ACCESS_TOKEN = await oAuth2Client.getAccessToken();
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: MY_EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: ACCESS_TOKEN,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  //EMAIL OPTIONS
  const from = MY_EMAIL;
  const subject = "🌻 This Is Sent By NodeMailer 🌻";
  const html = `
    <p>Hí bạn ${to},</p>
    <p>Vui lòng kích hoạt tài khoản của bạn <a href='${Server}/account/active?token=${token}'>Tại đây</a> </p>
    <strong>Liên Kết sẽ hết hạn trong 1 phút, vui lòng nhanh cái tay lên ^^</strong>
    <p>Thank you</p>
    `;

  return new Promise((resolve, reject) => {
    transport.sendMail({ from, subject, to, html }, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
};

module.exports = { sendTestEmail };