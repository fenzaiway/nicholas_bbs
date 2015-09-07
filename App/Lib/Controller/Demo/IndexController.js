/**
	demo控制类
*/
var fs = require("fs");
var path = require('path');
module.exports = Controller("Demo/BaseController", function() {
    "use strict";

    return {
        indexAction: function() {
            var self = this;
            self.assign("title", "Nicholas学习Demo");
            self.display();
        },
        demoPageAction:function(){
            var self = this;
             var pageNow = self.get("pageNow") || 1;
            var pageSize = self.get("pageSize") || 10;
            D('BlogDemo').where({'t_status':'1'}).page(pageNow, pageSize).order('t_id desc').countSelect().then(function(data){
                self.json(data);
            });
        },
        demoRouteAction: function() {
            var self = this;
            var src = self.get('src');
            self.display('Demo/demo/' + src + '.html');
        },
        uploadDemoAction: function() {
            var self = this;
            self.assign("title", "Nicholas学习Demo上传");
            self.display('Demo/upload.html');
        },
        uploadAction: function() {
             var self = this;
            var file = self.file('html');
            var originalFilename = file.originalFilename;
            var name = self.post('name');
            var ext = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
            if(name === ""){
            	name = originalFilename.substring(0,originalFilename.lastIndexOf("."));
            }
            if ('html' !== ext) {
                var html = "<span>文件格式不正确，请上传html格式的文件</span><a href='javascript.void(0);' onclick='window.history.back();'>返回</a>";
                self.end(html);
                return;
            }

            var date = new Date();
            var fileName = "" + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getTime();
            //self.end(fileName);
            fs.readFile(file.path, 'utf-8', function(err, data) {
                if (err) {
                    console.info(err);
                }

                var dirPath = path.resolve(__filename,'../../../../View/Demo/demo/');

                fs.exists(dirPath, function(exists) {
                    if (!exists) {
                        fs.mkdirSync(dirPath, '0777');
                    }
                    var savePath = dirPath+"/" + fileName + path.extname(originalFilename);
                    fs.writeFile(savePath, data, 'utf-8', function(err) {
                        if (err) {
                            console.info(err);
                            return;
                        }
                        //self.end('文件上传成功');
                        var data = {
                            "t_file_name": fileName,
                            "name":name,
                            "t_status":"2",
                            "t_original_file_name": originalFilename
                        }
                        D("BlogDemo").add(data).then(function(insertId){
                        	///self.redirect('/Demo/index/uploadDemo');
                            var html = "<span>谢谢您的支持，demo上传成功，但demo需要管理员审核之后才能列表显示</span><a href='/Demo/index/uploadDemo'>上传新demo</a>";
                            self.end(html);
                            return;
                        });
                    });
                })
            });
            
        }
    }
})
