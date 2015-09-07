var paging = function() {
    var pageSize = 10;
    var __pageNow = 0; //当前页
    var __url = ""; //请求连接
    var __callback; //回调
    var __pageCount = 0;
    var __opts = {};
    /**创建页面导航*/
    function pageLink(count, pageNow) {
        var pageCount = __pageCount = Math.ceil(count / pageSize);
        if(pageCount === 1 || count === 0){
            return;
        }
        var pages = [];
        var pageHtml = [];
        if (pageNow > 1 && pageNow < pageCount) {
            pages.push(pageNow - 1);
            pages.push(pageNow);
            pages.push(pageNow + 1);
        } else if (pageNow === 1 && pageCount > 1) {
            pages.push(pageNow);
            pages.push(pageNow + 1);
        } else if (pageNow === pageCount && pageCount > 1) {
            pages.push(pageNow - 1);
            pages.push(pageNow);
        }

        var active = (pageNow === 1) ? 'active' : '';
        pageHtml.push('<li class="' + active + '"><a href="javascript:void(0)" onClick="paging.firstPage()">首页</a></li>');
        var disabled = (pageNow === 1) ? 'disabled' : '';
        pageHtml.push('<li class="' + disabled + '"><a href="javascript:void(0)" onClick="paging.prePage()">上一页</a></li>');

        //加载数字页
        pages.forEach(function(p) {
            pageHtml.push('<li><a href="javascript:void(0)" onClick="paging.load(' + p + ')">' + p + '</a></li>');
        });

        disabled = (pageNow === __pageCount) ? 'disabled' : '';
        pageHtml.push('<li class="' + disabled + '"><a href="javascript:void(0)" onClick="paging.nextPage()">下一页</a></li>');
        active = (pageNow === __pageCount) ? 'active' : '';
        pageHtml.push('<li class="' + active + '"><a href="javascript:void(0)" onClick="paging.endPage()">末页</a></li>');
        $("#ni-pagination").html(pageHtml.join(""));
    }

    /**
     * 判断对象是为空
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    function isEmptyObj(obj){
        var hasProp = false;
        for (var prop in obj){
            hasProp = true;
            break;
        }
        return hasProp;
    }

    return {
        /**加载页面*/
        loadPage: function(pageNow, url, callback) {
            __pageNow = pageNow;
            __url = url;
            __callback = callback;
            __opts["pageNow"] = __pageNow;
            __opts["pageSize"] = pageSize;
            $.get(url, __opts, function(pages) {
                pageLink(pages.count, pageNow);
                callback(pages);
            });
        },
        /**上一页*/
        prePage: function() {
            if (__pageNow > 1) {
                __pageNow -= 1;
            } else {
                __pageNow = 1;
            }
            this.load();
        },
        /**下一页*/
        nextPage: function() {
            if (__pageNow < __pageCount) {
                __pageNow += 1;
            } else {
                __pageNow = __pageCount;
            }
            this.load();
        },
        /**首页*/
        firstPage: function() {
            __pageNow = 1;
            this.load();
        },
        /**末页*/
        endPage: function() {
            __pageNow = __pageCount;
            this.load();
        },
        /**加载页面*/
        load: function(current) {
            __pageNow = current || __pageNow;
            this.loadPage(__pageNow, __url, __callback);
        },
        /**设置页面连接*/
        setPageLink:function(url,pageNow,count,callback,options){
        	__url = url;
            __pageNow = parseInt(pageNow);
        	__callback = callback;
            if(options){
                __opts = $.extend({},options);
            }
        	pageLink(parseInt(count),__pageNow);
        }
    };
}();
