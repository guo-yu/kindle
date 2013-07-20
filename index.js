/**
 *
 * kindle
 * @author: [turingou]
 * @created: [2013/07/20]
 *
 **/

var pkg = require('./pkg').fetch(),
    optimist = require('optimist'),
    argv = optimist.argv,
    color = require('colorful'),
    mail = require('./lib/mail');

// 校验是不是邮箱
function checkEmail(email) {
    var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return re.test(email);
}

/**
 *
 * 发送邮件到kindle
 * params[to] srting
 * params[from] string
 * params[sender] obj
 * params[files] array
 **/
exports.push = function(params, cb) {
    mail.send({
        to: params.to,
        from: params.from,
        sender: params.sender,
        files: params.files
    }, function(stat) {
        cb(stat)
    });
}

// 设置发件邮箱或者接收邮箱
exports.config = function(type, params) {
    var p = pkg;
    p[type] = params;
    require('./pkg').set(p);
    return p;
}

/**
 *
 * kindle cli
 **/
exports.cli = function() {

    // console.log(argv);
    var to = '';
    var argument = argv._;

    // 检查是不是设置接收邮箱
    if (argv.m) {
        if (checkEmail(argv.m)) {
            exports.config('mime',argv.m);
            console.log(color.green('常用kindle收件邮箱的地址已成功变更为') + color.yellow(argv.m))
        } else {
            console.log(color.red('你输入的邮箱地址好像不对？'))
            return false;
        }   
    } else if (argv.sender) {
        if (argument.length == 1) {
            if (checkEmail(argv.sender)) {
                exports.config('sender',{
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
            if (pkg.mime != 'false') {
                to = pkg.mime.toString()
            } else {
                console.log(color.red('抱歉，你好像没有指定kindle邮箱地址，请使用 -s 或者 -m 设置常用地址'))
                return false;
            }
        }

        if (argument.length > 0) {
            if (pkg.sender && typeof(pkg.sender) == 'object') {
                exports.push({
                    to: to,
                    from: pkg.sender.email,
                    sender: pkg.sender,
                    files: argument
                }, function(result) {
                    if (result.stat != 'error') {
                        console.log(color.green('恭喜，' + argument[0] + '等 ' + argument.length + ' 个文件已成功推送到kindle!'));
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