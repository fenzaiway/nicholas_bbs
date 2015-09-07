define(function(require, exports, module){

    require("jquery");
    require("page");
    require("index-footer");

    function createDemoTable(datas){
        var htmlArr = [];
        var label = "", status = 0, statusText = "";
        for(var i=0, len = datas.data.length;i<len;i++){
            htmlArr.push("<tr>");
            htmlArr.push("<td>" + (i+1) + "</td>");
            htmlArr.push("<td><a target='_blank' href='/d/"+ datas.data[i].t_file_name+"'>" + datas.data[i].name + "</a></td>");

            status = datas.data[i].t_status
            if(status == 1){
                label = "label-success";
                statusText = "审核通过";
            }else if(status == 2){
                label = "label-warning";
                statusText = "未审核";
            }else{
                label = "label-danger";
                statusText = "审核不通过";
            }

            htmlArr.push("<td><span class='label "+label+"'>" + statusText + "</span></td>");
            htmlArr.push('<td> <a class="btn btn-primary" href="/admin/demo/auditUpdate.html?t_id='+datas.data[i].t_id+'&status=1" title="审核通过">审核通过</a> <a class="btn btn-danger" href="/admin/demo/auditUpdate.html?t_id='+datas.data[i].t_id+'&status=3" title="审核不通过">审核不通过</a> </td>');
            htmlArr.push("</tr>");
        }
        
        $("#demo-table").empty().html(htmlArr.join(""));
    }

    $(function(){
        paging.loadPage(1,"/admin/demo/auditPage",createDemoTable);
    });
});