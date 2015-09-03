define(function(require, exports, module){
    require("jquery");
    require("page");
    require("common");
    function createArticleList(pages){
    var data = pages.pages;
        var len = data.length;
        var htmlArr = [];
        for(var i=0; i<len; i++){
            htmlArr.push('<tr>');
            htmlArr.push('<td><a target="_blank" href="/detail/'+data[i].t_id+'">'+data[i].t_title+'</a></td>');
            htmlArr.push('<td>'+new Date(data[i].t_time).format("yyyy-MM-dd hh:mm:ss")+'</td>');
            htmlArr.push('<td><a href="/admin/article/preUpdateArticle.html?tid='+data[i].t_id+'">修改</a>');
            htmlArr.push('&nbsp;&nbsp;<a href="javascript:void(0);" class="del" data-id="'+data[i].t_id+'">删除</a>');
            htmlArr.push('</td>');
            htmlArr.push('</tr>');
        }

        $("#articleBody").empty().html(htmlArr.join(""));

        $(".del").click(delHandler);
   }    

   function delHandler(){
    if(window.confirm("是否删除?")){
        $.get("/admin/article/articleDelete.html",{"tid":$(this).data("id")},function(result){
            if(result.msg === 0){
                articleLoad();
            }else{
                alert('删除失败');
            }
        })
    }
   }

    function articleLoad(){
        paging.loadPage(1,"/admin/article/articleList.html",createArticleList);
    }

    articleLoad();
});