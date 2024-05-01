"use strict"

const express = require("express");
const app = express();
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require("dotenv")
dotenv.config()

const PORT = process.env.PORT


const bodyParser = require('body-parser');

//app setting
app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.static(__dirname + '/public'));



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get("/", (req, res) => {
    res.render("home/home-1")
});

app.get("/member", (req, res) => {
    res.render("home/member")
});


app.get("/coding_team", (req, res) => {
  res.render("home/coding_team")
});
app.get("/electrical_team", (req, res) => {
  res.render("home/electrical_team")
});
app.get("/fabrication_team", (req, res) => {
  res.render("home/fabrication_team")
});
app.get("/media_team", (req, res) => {
  res.render("home/media_team")
});



// node mailer
const emailConfig = {
  service: "gmail", // 이메일 서비스 (Gmail 사용)
  auth: {
    user: "systemresetsend@gmail.com", // 발신자 이메일 주소
    pass: process.env.NODEAPP_PS, // 발신자 이메일 계정의 암호 (앱 비밀번호를 사용해야 할 수도 있음)
  },
};


app.get('/apply', (req, res) => {
    res.render('home/apply')
  });

app.post('/submit-apply', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  console.log(name, email, message)

  const fs = require('fs');
  const imageAttachment = fs.readFileSync('./public/img/bg/loogo.jpg');
 
  // Nodemailer를 사용하여 이메일 전송
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: 'systemresetsend@gmail.com', // 발신자 이메일 주소
    to: 'srmain7135@gmail.com', // 수신자 이메일 주소 (개발자 이메일)
    subject: 'Application', // 이메일 제목
    html: `<div style="font-size: 20px;"><strong>One applicant has been added!</strong></div>
          <div style="font-size: 16px;"><strong>Applicant-name: ${name}</strong></div>
            <div style="font-size: 16px;"><strong>Applicant-email: </strong>${email}</div>
      <div style="font-size: 16px;"><strong>Applicant-introduce: </strong>${message}</div>`,
    attachments: [
      {
        filename: 'logo.jpg',
        content: imageAttachment, // 이미지 파일을 첨부
        encoding: 'base64'
      }
    ]
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Apply error:', error);
      res.status(500).send('error');
    } else {
      console.log('Apply success:', info.response);
      res.send('Apply success!');
    }
  });
});









app.listen(PORT, () => {
    console.log("server start!")
});