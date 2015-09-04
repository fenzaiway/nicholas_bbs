/**
 * 导航模块
 */
define(function(require, exports, module){
    require('jquery');
    require('page');

    function createNav(navs){
        var data = navs.navs;
        var len = data.length;
        var htmlArr = [];
        for(var i=0; i<len; i++){
            if(i===0 || (i%3===0)){
                htmlArr.push('<div class="row">');
            }
            htmlArr.push('<div class="ni-front-nav col-md-3">');
            htmlArr.push('<div class="inner">');
            htmlArr.push('<span class="title"><a target="_blank" href="'+data[i].t_link+'">'+data[i].t_title+'</a></span>');
            htmlArr.push('<span class="description">'+data[i].t_description+'</span>');
            htmlArr.push('</div></div>');
            if((i%3 === 2) || i===len-1){
                htmlArr.push('</div>');
            }
        }
        $("#nav-container").html(htmlArr.join(""));
    }

    (function(){
        paging.loadPage(1,"/home/index/navList.html",createNav);
    })();
});