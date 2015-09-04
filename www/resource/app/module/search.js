/**
 * 搜索模块
 */
define(function(require, exports, module){
    require('jquery');
    require('page');
    require('common');
    require('aside');

    function buildData(pages){
         var len = pages.data.length;
        var htmlArr = [];
        for(var i=0; i<len; i++){
            htmlArr.push('<li class="ni-article">');
            htmlArr.push('<div class="ni-article-container">');
            htmlArr.push('<span class="ni-article-title"><a target="_blank" href="/detail/'+pages.data[i].t_id+'">'+pages.data[i].t_title+'</a></span>');
            htmlArr.push('<time class="ni-article-time">'+new Date(pages.data[i].t_time).format("yyyy-MM-dd hh:mm:ss")+'</time>');
            htmlArr.push('</div>');
            htmlArr.push('</li>');
        };
        $(".ni-article-list").html(htmlArr.join(""));
    }

    (function(){
        var kw = $("#kw-highline").text();
        $("#kw").val(kw)
        paging.setPageLink("/Home/Search/page",1,$("#ni-pagination").attr("count"),buildData,{kw:kw});
    })();
});