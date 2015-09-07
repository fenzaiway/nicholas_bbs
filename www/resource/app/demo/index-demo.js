define(function(require, exports, module){
    require("jquery");
    require("page");
    require("index-footer");

    function createDemo(datas){
        var htmlArr = [];
        var label = "", status = 0, statusText = "";
        for(var i=0, len = datas.data.length;i<len;i++){
            htmlArr.push('<div class="col-md-3 demo-container">');
            htmlArr.push('<a target="_blank" href="/d/'+datas.data[i].t_file_name+'">'+datas.data[i].name+'</a>');
            htmlArr.push('</div>');
        }
        
        $("#demo-container").empty().html(htmlArr.join(""));
    }


    $(function(){
        paging.loadPage(1,"/demo/index/demoPage",createDemo);
    });
});
