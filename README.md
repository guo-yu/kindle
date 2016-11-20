## kindle ![npm](https://badge.fury.io/js/kindle.png)

a command line file pusher for your kindle.

![screenshot](http://ww3.sinaimg.cn/large/61ff0de3gw1e6wsmhtwdgj20jv0eddh9.jpg)

### Installation
```
$ [sudo] npm install kindle -g
```

### Setup Guide

1. setup your sender's email(SMTP) via `$ kindle config --user.mail` and `$ kindle config --user.password`.
2. setup your sender's email be trusted in [Amazon Kindle Dashboard](#/#).
3. push files via command line like `$ kindle send mybook.pdf` to your @free.kindle.com email account.
3. enjoy reading :)

### Configs Guide

config sender's email
```
$ kindle config --user.mail sample@mail.com --user.password pass
```
configs @kindle.com email
```
$ kindle config --kindle.mail sample@kindle.com
```

### Example

```javascript
var kindle = require('kindle');

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
```
### Supported File Types:
- Microsoft Word (.DOC, .DOCX)
- HTML (.HTML, .HTM)
- RTF (.RTF)
- JPEG (.JPEG, .JPG)
- Kindle Format (.MOBI, .AZW)
- GIF (.GIF)
- PNG (.PNG)
- BMP (.BMP)
- PDF (.PDF)

### Contributing
- Fork this repo
- Clone your repo
- Install dependencies
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Open a pull request, and enjoy <3

### MIT license
Copyright (c) 2014 turing &lt;o.u.turing@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
![docor](https://cdn1.iconfinder.com/data/icons/windows8_icons_iconpharm/26/doctor.png)
built upon love by [docor](https://github.com/turingou/docor.git) v0.1.3
