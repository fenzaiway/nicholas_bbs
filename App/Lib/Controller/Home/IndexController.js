/**
 * controller
 * @return 
 */

var moment = require('moment');
/*var ejs = require('ejs');
ejs.filters.dateformat = function(obj, format) {
    if (format == undefined) {
        format = 'YYYY-MM-DD HH:mm:ss';
    }
    var ret = moment(obj).format(format);
    return ret == 'Invalid date' ? '0000-00-00 00:00:00' : ret;
};
*/
module.exports = Controller("Home/BaseController", function(){
  "use strict";

  function indexQuery(self,callback){
    var pageResult = {};
      var pageNow = self.get("pageNow") || 1;
      var pageSize = self.get("pageSize") || 10;
      var from = (parseInt(pageNow)-1)*parseInt(pageSize);
      D("BlogArticle").count("t_id").then(function(count){
        pageResult.count = count;
      }).then(function(){
          console.info('pageNow=' + pageNow);
          D("BlogArticle").query('select a.t_id,a.t_title,a.t_time,b.type from __TABLE__ as a, t_blog_type as b where  a.t_type_id=b.id  order by a.t_id desc limit '+from+','+pageSize,[])
            .then(function(data){
              pageResult.data = data;
              pageResult.pageNow = pageNow;
              callback(pageResult);
          });
      });
  }

  return {
    indexAction: function(){
      var self = this;
      indexQuery(self,function(data){
        //self.json(data);
        self.assign({
          "title":"Nicholas学习笔记",
          "IndexData":data
        });
        self.display();
      });
    },
    articlePageAction:function(){
      var self = this;
      indexQuery(self,function(data){
          self.json(data);
      });
    },
    articleDetailAction:function(){
      var self = this;
      var articleId = self.get("id");
      D("BlogArticle").where({"t_id":articleId}).select().then(function(data){
        var article = {};
         article.articleId = data.t_id;
         article.title = data[0].t_title;
         article.content = data[0].t_content;
         self.assign(article);
         self.display();
      });
    },
    headerAction:function(){
      var self = this;
      self.assign("title","Nicholas学习笔记");
      self.display("home/header.html");
    },
    footerAction:function(){
      var self = this;
      self.display("home/footer.html");
    },
    navAction:function(){
      var self = this;
      self.assign("title","Nicholas前端导航");
      self.display("Home/nav.html");
    },
    navListAction:function(){
      var self = this;
      D("FrontNav").count("t_id").then(function(count){
          var pageNow = self.get("pageNow");
          var pageSize = self.get("pageSize");
          D("FrontNav").page(pageNow,pageSize).select().then(function(data){
            self.json({
              count:count,
              navs:data
            });
          });
      });
    }
  };
});