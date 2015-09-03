/**
 * controller
 * @return 
 */

var fs = require("fs");
var path = require("path");
var url = require("url");
var uploadPath = path.resolve("/resource/upload") + "/";


module.exports = Controller("Ueditor/BaseController", function(){
  "use strict";

   function upload(data){
      var imgname = data.filename;
          var originalFilename = data.originalFilename;
          var temPath = data.path;
          console.info('RESOURCE_PATH =' + RESOURCE_PATH);
          var basePath = '/resource/images/upload/';
          var img_url = RESOURCE_PATH + basePath;
          var ext = path.extname(originalFilename);
          var newFileName = (new Date() - 0) + ext;
          
          var finalFilePath = img_url + newFileName;
           //fs.renameSync(temPath, img_url+newFileName);
          //你只要输入要保存的地址 。保存操作交给ueditor来做
          //console.info('aaaaaaaaaaaa');

          //判断文件目录是否存在，不存在则创建
          fs.exists(img_url,function(exists){
            if(!exists){
              fs.mkdir(img_url,777,function(err){
                console.info('mkdir err ' + err);
              });
            }
          });

          fs.readFile(temPath,function(err,data){
              if(err){
                console.log('read file err ' + err);
              }else{
                fs.writeFile(finalFilePath,data,function(err){
                  if(err){
                    console.log('write file err' + err);
                  }else{
                    console.info('saved');
                  }
                })
              }
          });
          //console.info(finalFilePath);
          var returnObj = {};
          returnObj.state = "SUCCESS";
          returnObj.url = basePath + newFileName;
          returnObj.title = newFileName;
          returnObj.type = ext;
          returnObj.size = data.size;
          
          returnObj.original = originalFilename;

          return returnObj;
   }

  return {
    ueditorAction: function(){
      //render View/Home/index_index.html file
      // ueditor 客户发起上传图片请求
      var self = this;
      var action = self.get("action");
      console.info("action====" + action)
      if (action === 'uploadimage') {
          var http = self.http;
          var req = http.req;
          var res = http.res;

          var foo = self.file("upfile");
          
          self.jsonp(upload(foo));
      }
      //  客户端发起图片列表请求
      else if (action === 'listimage') {
          var dir_url = '/images/ueditor/';
          // 客户端会列出 dir_url 目录下的所有图片
          //res.ue_list(dir_url); 
      }
      // 客户端发起其它请求
      else {
          self.header('Content-Type', 'application/json');
          self.redirect('/resource/ueditor/nodejs/config.json');
      }
      },
      indexAction:function(){
        this.end("editor index");
      }
  };
});
