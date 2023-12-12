const { google } = require("googleapis");
const nodemailer = require("nodemailer");


const CLIENT_ID = process.env.MAIL_CLIENT_ID || "250216999612-a06hluqqf48ov1a13luh934u2aobh0t4.apps.googleusercontent.com";
const CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET || "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";
const REFRESH_TOKEN =process.env.MAIL_REFRESH_TOKEN || "1//04e999ClCYcltCgYIARAAGAQSNwF-L9Ir8I8GFuGGaDjWHwGAkEO66bbHx_1z7z2Z6mV5dCQ5ZuuRc-tgpA8Sb1JB7gEOgX7tg-s";
const REDIRECT_URI =process.env.MAIL_REDIRECT_URI || "https://developers.google.com/oauthplayground";
const MY_EMAIL =process.env.MAIL_MY_EMAIL || "kieuthanhphat.2003.2018hdb@gmail.com";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


const sendTestEmail = async (toEmail, subject, html) => {
  const ACCESS_TOKEN = await oAuth2Client.getAccessToken();
  // console.log("Access Token: ", ACCESS_TOKEN);
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


  const from = `Anh Admin Khó Tánh <${MY_EMAIL}>`;

  return new Promise((resolve, reject) => {
    transport.sendMail({ from, subject, to: toEmail, html }, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
};

module.exports = { sendTestEmail };