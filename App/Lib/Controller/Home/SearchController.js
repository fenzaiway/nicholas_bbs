/**
 * 搜索相关
 */
module.exports = Controller("Home/BaseController", function() {
    "use strict";

    function searchByKw(self, callback) {
        var pageNow = self.get('pageNow') || 0;
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

    return {
        indexAction: function() {
            var self = this;
            searchByKw(self, function(self, data) {
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
            searchByKw(self, function(self, data) {
                self.json(data);
            });
        }
    };
});
