'use strict'

const kindle = require('../libs/kindle');

kindle.push({
  to: 'mail@kindle.com',
  from: 'sample@mail.com',
  sender: {
    email: 'sample@mail.com',
    password: 'pass'
  },
  files: ['./file.mobi'] // file need to be send
})
.then(data => {
  console.log(data)
})
.catch(err => {
  console.log(err)
})

// config a sender's email
kindle.config('sender', {
  email: 'sample@mail.com',
  password: 'pass'
})

// config a receiver's email
kindle.config('mime', 'mail@kindle.com');

// a shortcut to push files quickly,
// by default, it will search emails be configed before.
kindle.push({
  files: ['./file.mobi'] // 需要发送的文件
})
.then(data => {
  console.log(data)
})
.catch(err => {
  console.log(err)
})
