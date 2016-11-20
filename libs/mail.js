'use strict'

const fs = require('fs')
const path = require('path')
const nodemailer = require("nodemailer");

let resolveService = function(mail) {
  let regex = /^([\w\.\-]+)\@([\w\.\-]+)\.([a-zA-Z0-9]{2,4})+$/
  return regex.exec(mail)[2]
}

module.exports = function(params) {

  let smtpTransport = nodemailer.createTransport({
    service: resolveService(params.sender.email),
    auth: {
      user: params.sender.email,
      pass: params.sender.password
    }
  });

  let mailOptions = {
    from: 'Kindle Pusher <' + params.from + '>',
    to: params.to,
    subject: 'kindle'
  }

  if (params.files ) {
    mailOptions.attachments = [];

    for(let file of params.files) {
      mailOptions.attachments.push({
        filename: file,
        content: fs.createReadStream(path.join(process.env.PWD, file))
      })
    }
  }

  return smtpTransport.sendMail(mailOptions)
}
