var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
 secure:true,
 host:'smtp.gmail.com',
 port: 465,
 auth: {
  user: 'ankit00bhurji@gmail.com',
  pass: 'qxqfhtbnhbdzwgxm'
},
});

export const mailer = async (mailOptions:any) :Promise <any> => {
try {
  const mailResponse = await transporter.sendMail(mailOptions);
  return mailResponse;
} catch (error) {
  console.error('Error occurred:', error);
  throw error;
}
}

