var fs = require('fs');
var md = require('markdown-pdf');
var color = require('colorful');

var list = [
  'py',
  'js',
  'css',
  'less',
  'sass',
  'scss',
  'rb'
];

// 现在的困境是转换成pdf的话
module.exports = function(string, cb) {
  var afterfix = string.substr(string.lastIndexOf('.') + 1);
  if (string.indexOf('http://') == 0 || string.indexOf('https://') == 0) {
    // 这里自己使用request抓下来，变成html之后转换成pdf
    cb({
      fileName: string.substr(string.indexOf('//') + 2, string.indexOf('.') + 1) + '.txt',
      filePath: string
    });
  } else if (afterfix == 'md' || afterfix == 'markdown') {
    console.log('正在分析' + afterfix + '文件，请稍等');
    md(string, {
      paperFormat: 'Legal',
      paperBorder: '20px'
    }, function(err, pdfPath) {
      if (!err) {
        cb({
          fileName: string + '.pdf',
          filePath: pdfPath
        });
      } else {
        console.log(color.red('抱歉，转换失败，详情如下：'))
        console.log(err);
        console.log(color.yellow('尝试以txt格式发送'));
        fs.readFile(string, function(err, file) {
          cb({
            fileName: string + '.txt',
            contents: file.toString()
          });
        });
      }
    });
  } else if (list.indexOf(afterfix) > -1) {
    console.log('正在分析' + afterfix + '文件');
    cb({
      fileName: string + '.html',
      filePath: string
    });
  } else {
    cb({
      filePath: string
    });
  }
}