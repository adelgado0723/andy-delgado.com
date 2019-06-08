require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.type('html');
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.post('/contact', (req, res) => {
  console.log(req);
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USR,
      pass: process.env.GMAIL_PASS,
    },
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: process.env.GMAIL_USR,
    subject: 'New message from contact form at andy-delgado.com',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`,
  };
  smtpTrans.sendMail(mailOpts, function(error, response) {
    if (error) {
      res.end('contact-failure');
    } else {
      res.end('contact-success');
    }
  });
});

app.listen(3000);
console.log('listening on http://localhost:3000');
