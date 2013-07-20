# kindle pusher ![](https://badge.fury.io/js/kindle.png)

kindle mail-pusher based on node-pdf && nodemailer

是不是很烦有的时候你想安安静静地在kindle上看点儿东西（比如代码）。但又被页面上浮躁的花花绿绿的东西所影响？这个小工具就为了这个目的而设计，你可以使用命令行把txt文件，js文件或者其他的文本文件，图像发送到你的kindle。一行命令，就是这么简单。

当然，你也可以在自己的node程序中 `require('kindle')` 随心所欲构建自己想要的阅读环境。

### 如何安装

`npm install kindle` 

### 如何使用

首先，使用 `kindle --sender` 配置自己的推送邮箱，使用SMTP服务。
然后，将你的亚马逊账户中将kindle推送的邮箱设置成可信的。

````
$ kindle -s yourEmail@yourDomain.com file.txt // 将file.txt 发送到你的kindle邮箱

// 支持的文件格式是，所有kindle.cn官方支持的文件格式如下：
Microsoft Word (.doc, .docx) 
RTF文件(.rtf) 
HTML(.htm, .html)
TXT文件(.txt) 
Zip, x-zip压缩文件
Mobi格式电子书 

JPEG (.jpg), GIF (.gif), Bitmap (.bmp) 和 PNG (.png) 格式的图片。
Adobe PDF (.pdf)文档可维持原文件格式，发送至您的Kindle。


````
### 设置常用被推送的邮箱

如果你懒得每次都输入`-s`这样蛋疼的命令的话，一个明智的选择是提前设置好你的kindle的邮箱地址。

````
$ kindle -m mime@free.kindle.cn // mime是你自己的邮箱前缀
$ kindle demo.txt // 然后就可以直接发送了
````

### 设置自己的推送邮箱

目前支持的发送邮箱是`qq.com`后缀的邮箱

按照如下的方式设置自己的邮箱去推送，设置完之后别忘了将你自己的邮箱加入亚马逊的信任列表哦~

````
$ kindle --sender my@my.com 123456123 // 设置自己的邮箱账户和密码
````
### 在node程序中使用

````javascript
var kindle = require('kindle');

// 直接发送
kindle.push({
    to: 'abc@abc.com',
    from: 'a@b.com',
    sender: {
        email: 'xxx',
        password: 'xxx'
    },
    files: ['./my_code.txt'] // 需要发送的文件
});

// 配置发送邮箱
kindle.config('sender',{
    email: 'my@my.com',
    password: '123123123'
});

// 配置接收邮箱
kindle.config('mime',{
    email: 'my@my.com'
});

````

### 反馈与建议

欢迎PR或联系 [新浪微博@郭宇](http://weibo.com/turingou)