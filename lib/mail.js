var nodemailer = require("nodemailer"),
    parser = require('./parser'),
    async = require('async'),
    service = {
        qq: {
            host: 'smtp.qq.com',
            port: '25',
            use_authentication: true
        }
    }

var sendMail = function(smtpTransport,mailOptions,cb) {
  smtpTransport.sendMail(mailOptions, function(error, response) {
    if(error) {
      cb({
        stat: 'error',
        error: error
      });
    } else {
      cb(response);
    }
    smtpTransport.close();
  });
};

exports.send = function(params,cb) {
  
  var smtpTransport = nodemailer.createTransport("SMTP", {
    host: service.qq.host,
    port: service.qq.port,
    use_authentication: service.qq.use_authentication,
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

  var wash = function(file,cb) {
    parser(file,function(result){
      mailOptions.attachments.push(result);
      cb();      
    })
  };

  if (params.files && params.files.length > 0) {
    mailOptions['attachments'] = [];
    async.each(params.files,wash,function(err){
      if (!err) {
        sendMail(smtpTransport,mailOptions,cb)
      }
    });
  } else {
    sendMail(smtpTransport,mailOptions,cb)
  }

}