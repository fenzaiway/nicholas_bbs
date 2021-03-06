/**
 * 首页
 */
define(function(require, exports, module){
    require('jquery');
    require('page');
    require('common');
    var footer = require('index-footer');
    var aside = require('aside');

    function buildData(pages){
         var len = pages.data.length;
        var htmlArr = [];
        for(var i=0; i<len; i++){
            htmlArr.push('<li class="ni-article">');
            htmlArr.push('<div class="ni-article-container">');
            htmlArr.push('<span class="ni-article-type"><a href="/type/'+pages.data[i].t_type_id+'" >'+pages.data[i].type+'</a></span>');
            htmlArr.push('<span class="ni-article-title"><a target="_blank" href="/detail/'+pages.data[i].t_id+'">'+pages.data[i].t_title+'</a></span>');
            htmlArr.push('<time class="ni-article-time">'+new Date(pages.data[i].t_time).format("yyyy-MM-dd hh:mm:ss")+'</time>');
            htmlArr.push('</div>');
            htmlArr.push('</li>');
        };
        $(".ni-article-list").html(htmlArr.join(""));
        console.info($("#hidePageLink"));
        $("#hidePageLink").attr("href","/page/"+pages.pageNow).html(pages.pageNow);
    }

    var index = function(){
        //paging.loadPage(1,"/home/index/articlePage/",buildData);
        paging.setPageLink("/home/index/articlePage/",$("#ni-pagination").attr("pageNow"),$("#ni-pagination").attr("count"),buildData);
    }

    index();
    footer.footer();
    module.exports = {index:index};
});