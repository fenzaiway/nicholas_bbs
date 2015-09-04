/**
 * 搜索相关
 */
module.exports = Controller("Home/BaseController", function() {
    "use strict";

    function __searchByKw(self, callback) {
        var pageNow = self.get('pageNow') || 1;
        var pageSize = self.get('pageSize') || 10;
        var kw = decodeURI(self.get("kw")) || "";
        if ("" === kw) {
            D("BlogArticle").where({}).page(pageNow, pageSize).order('t_id desc').field(['t_id', 't_title','t_time']).countSelect().then(function(data) {
                data["kw"] = kw;
                callback(self, data);
            });
        } else {
            D("BlogArticle").where({
                't_title|t_content': ['like', '%' + kw + '%']
            }).page(pageNow, pageSize).order('t_id desc').field(['t_id', 't_title','t_time']).countSelect().then(function(data) {
                data["kw"] = kw;
                callback(self, data);
            });
        }
    }

    /**
     * 根据文章类型搜索
     * @param  {[type]}   self     [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    function __searchByType(self,callback){
        var typeId = self.get("typeId");
        var pageNow = self.get('pageNow') || 1;
        var pageSize = self.get('pageSize') || 10;

        var from = (pageNow-1)*pageSize;

        D("BlogArticle").query('select a.t_id,a.t_title,a.t_time,b.type from __TABLE__ as a, t_blog_type as b where a.t_type_id=b.id and b.id='+typeId+' order by a.t_id desc limit '+from+','+pageSize,[]).then(function(data){
            D("BlogArticle").query('select count("a.t_id") as count, b.type as type from __TABLE__ as a, t_blog_type as b where a.t_type_id=b.id and b.id='+typeId).then(function(countData){
                var resultObj = {
                    count:countData[0].count,
                    type:countData[0].type,
                    typeId:typeId,
                    data:data
                };
                callback(self,resultObj);
            });
            
        });
    }

    function __searchByAside(self,callback){
        D("BlogArticle").query('select count(a.t_id) as count,b.type,b.id from __TABLE__ as a , t_blog_type as b where a.t_type_id = b.id GROUP BY b.type order by b.id ').then(function(data){
            callback(self, data);
        });
    }

    return {
        indexAction: function() {
            var self = this;
            __searchByKw(self, function(self, data) {
                self.assign({
                    "title": "Nicholas搜索",
                    "searchData": data
                });
                self.display("Search/index.html");
                //self.json(data);
            });
        },
        pageAction: function() {
            var self = this;
            __searchByKw(self, function(self, data) {
                self.json(data);
            });
        },
        /**
         * 根据文章类型查找
         * @return 
         */
        searchByTypeAction:function(){
            var self = this;
            __searchByType(self,function(self,data){
                //self.json(data);
                self.assign({
                    "title": "Nicholas按类型查询",
                    "SearchData": data
                });
                self.display("Search/search-by-type.html");
            })
        },
        typePageAction:function(){
            var self = this;
            __searchByType(self,function(self,data){
                self.json(data);
            });
        },
        searchByAsideAction:function(){
            var self = this;
            __searchByAside(self,function(self, data){
                self.json(data);
            });
        }
    };
});
