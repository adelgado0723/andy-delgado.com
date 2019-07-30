require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator/check');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.type('html');
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.post(
  '/contact',
  [
    check('name')
      .trim()
      .escape(),
    check('email')
      .isEmail()
      .normalizeEmail(),
    check('message')
      .trim()
      .escape(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
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
      // textEncoding: 'UTF-8',
    };
    smtpTrans.sendMail(mailOpts, function(error, response) {
      // console.log(response);
      if (error) {
        console.log(error);
        res.end('contact-failure');
      } else {
        res.end('contact-success');
      }
    });
  }
);

app.listen(3000);
console.log('listening on http://localhost:3000');
