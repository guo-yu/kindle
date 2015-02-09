var kindle = require('../libs/kindle');

kindle.push({
  to: 'abc@abc.com',
  from: 'a@b.com',
  sender: {
    email: 'xxx',
    password: 'xxx'
  },
  files: ['./my_code.txt'] // file need to be send
}, function(err, result){
  // do sth
});

// config a sender's email
kindle.config('sender', {
  email: 'my@my.com',
  password: '123123123'
});

// config a receiver's email
kindle.config('mime', 'my@free.kindle.com');

// a shortcut to push files quickly,
// by default, it will search emails be configed before.
kindle.push({
  files: ['./my_code.txt'] // 需要发送的文件
},function(err, result) {
  // do sth
});