define(function(require, exports, module) {

    require('jquery');
    require('underscore');
    var Backbone = require('backbone');
    require('avalon');

    /******jquery part start*******/
       function jqueryPart(data){
             $("[data-name]").each(function(){
                $(this).html(data[$(this).data("name")]);
            });
       }
    /******jquery part end*******/

    /******backbone part start*******/
    var TestModel = Backbone.Model.extend({
        default: {
            "name": "",
            "sourcename": "",
            "title": "",
            "url": "",
            "type": "",
            "msgId": "",
            "time": "",
            "snsname": "",
            "snsnumber": "",
            "song": ""
        },
        url:"/resource/data/mvc-mvvm.json"
    });

    var model = new TestModel();
    model.fetch();
    var temp = "<li><%=name%></li><li><%=sourcename%></li><li><%=title%></li><li><%=url%></li><li><%=type%></li><li><%=msgId%></li><li><%=time%></li><li><%=snsname%></li><li><%=snsnumber%></li><li><%=song%></li>";

    var View = Backbone.View.extend({
        el:$("#backbone"),
        initialize:function(){
            this.listenTo(model,"change",this.render);
        },
        render:function(context){
            jqueryPart(model.attributes);
            avalonPart(model.attributes);
            $(this.el).html(_.template(temp)(context.attributes));
        }
    });

    new View();
    /******backbone part end*******/


    /******jquery part start*******/
    var v = avalon.define({
                $id:'avalonPart',
                datas:{"a":"b"}
             });
       function avalonPart(data){
             v.datas = data;
       }
    /******jquery part end*******/
});
