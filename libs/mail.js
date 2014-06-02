var nodemailer = require("nodemailer");
var parser = require('./parser');
var async = require('async');

function sendMail(smtpTransport, mailOptions, callback) {
  return smtpTransport.sendMail(mailOptions, function(error, response) {
    if (!error) return callback(response);
    callback({
      stat: 'error',
      error: error
    });
    return smtpTransport.close();
  });
};


exports.send = function(params, cb) {

  var smtpTransport = nodemailer.createTransport("SMTP", {
    auth: {
      user: params.sender.email,
      pass: params.sender.password
    }
  });

  var mailOptions = {
    from: 'Kindle Pusher <' + params.from + '>',
    to: params.to,
    subject: 'kindle'
  }

  function wash(file, cb) {
    parser(file, function(result) {
      mailOptions.attachments.push(result);
      cb();
    })
  };

  if (params.files && params.files.length > 0) {
    mailOptions['attachments'] = [];
    async.each(params.files, wash, function(err) {
      if (!err) return sendMail(smtpTransport, mailOptions, cb)
    });
  } else {
    sendMail(smtpTransport, mailOptions, cb)
  }

}
