var fs = require('fsplus');
var path = require('path');
var consoler = require('consoler');
var utils = require('./utils');

var configFile = path.resolve(__dirname, '../config.json');
var configs = fs.readJSON(configFile);

module.exports = function() {

  var to = '';
  var argument = argv._;

  // 检查是不是设置接收邮箱
  if (argv.m) {
    if (checkEmail(argv.m)) {
      fs.updateJSON(configFile, {
        mime: argv.m
      });
      console.log(color.green('常用kindle收件邮箱的地址已成功变更为') + color.yellow(argv.m))
    } else {
      console.log(color.red('你输入的邮箱地址好像不对？'))
      return false;
    }
  } else if (argv.sender) {
    if (argument.length == 1) {
      if (checkEmail(argv.sender)) {
        fs.updateJSON('sender', {
          email: argv.sender,
          password: argument[0]
        });
        console.log(color.green('恭喜，发件箱地址成功变更为') + color.yellow(argv.sender))
      } else {
        console.log(color.red('你输入的邮箱地址好像不对？'));
        return false;
      }
    } else {
      console.log(color.red('密码是不是输入错了？我没看到有密码哦'))
      return false;
    }
  } else {

    if (argv.s) {
      if (checkEmail(argv.s)) {
        to = argv.s;
      } else {
        console.log(color.red('你输入的邮箱地址好像不对？'))
        return false;
      }
    } else {
      if (configs.mime != 'false') {
        to = configs.mime.toString()
      } else {
        console.log(color.red('抱歉，你好像没有指定kindle邮箱地址，请使用 -s 或者 -m 设置常用地址'))
        return false;
      }
    }

    if (argument.length > 0) {
      if (configs.sender && typeof(configs.sender) == 'object') {
        console.log(color.yellow('文件发送中...'));
        var clock = setInterval(function() {
          console.log(color.green('...'))
        }, 800);
        exports.push({
          to: to,
          from: configs.sender.email,
          sender: configs.sender,
          files: argument
        }, function(result) {
          clearInterval(clock);
          if (result.stat != 'error') {
            console.log(color.green('恭喜，' + argument[0] + ' 等 ' + argument.length + ' 个文件已成功推送到您的 kindle !'));
          } else {
            console.log(color.red('发送失败...失败详情如下'))
            console.log(result.error);
            return false;
          }
        });
      } else {
        console.log(color.red('没有找到邮箱设置，请先设置一个发件邮箱 -> kindle --sender a@bcd.com'))
        return false;
      }
    } else {
      console.log(color.red('话说你到底要发送哪个文件？'))
      return false;
    }

  }
}