define(function(require, exports, module) {
    require("jquery");
    require("avalon");

    document.onkeydown = function(event) {
        var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        if (keyCode == 13) {
            searchGo();
        }
    }

    function searchGo() {
        location.href = '/search/' + document.getElementById('kw').value;
    }
    
    

    var v = avalon.define({
        $id:'type-aside',
        datas:{}

    });
    function getTypes(v){
        $.get('/Home/Search/searchByAside/',{},function(json,status){
            //avalon.datas = json;
            v.datas = json;
        });
    }
    getTypes(v);
});
