var nodemailer = require("nodemailer"),
    service = {
        qq: {
            host: 'smtp.qq.com',
            port: '25',
            use_authentication: true
        }
    }

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

  if (params.files && params.files.length > 0) {
    mailOptions['attachments'] = [];
    (function(files){
        for (var i = 0; i < files.length; i++) {
            mailOptions.attachments.push({
                filePath: files[i]
            });
        };
    })(params.files);
  }

  console.log('attachments');
  console.log(mailOptions.attachments);

  smtpTransport.sendMail(mailOptions, function(error, response) {
    if(error) {
      cb('error');
    } else {
      cb(response);
    }
    smtpTransport.close();
  });

}