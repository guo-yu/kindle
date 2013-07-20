var fs = require('fs'),
    md = require('markdown').markdown;

var list = [
    'py',
    'js',
    'css',
    'less',
    'sass',
    'scss',
    'rb'
];

module.exports = function(string,cb) {
    var afterfix = string.substr(string.lastIndexOf('.') + 1);
    if (string.indexOf('http://') == 0 || string.indexOf('https://') == 0) {
        // 暂时把html文件存成Txt文件
        cb({
            fileName: string.substr(string.indexOf('//') + 2,string.indexOf('.') + 1) + '.txt',
            filePath: string
        });
    } else if (afterfix == 'md' || afterfix == 'markdown') {
        console.log('正在分析' + afterfix + '文件');
        fs.readFile(string,function(err,file){
            cb({
                fileName: string + '.html',
                contents: md.toHTML(file.toString())
            });
        });
    } else if (list.indexOf(afterfix) > -1) {
        console.log('正在分析' + afterfix + '文件');
        fs.readFile(string,function(err,file){

            var contents =  '````' +
                            ' ' + 
                            file.toString() +
                            ' ' +
                            '````';
            cb({
                fileName: string + '.html',
                contents: md.toHTML(contents)
            });
        });
    } else {
        cb({
            filePath: string
        });
    }
}