define(function(require, exports, module){

    //seajs加载脚本
    require("jquery.min");
    require("underscore-min");
    var Backbone = require("backbone-min");

    //模板
    var temp = '<li class="item">书名：<%=name%>价格：<%=price%>出版社：<%=publisher%><a href="javascript:void(0)" class="btn btn-danger" data-name="<%=name%>">删除</a></li>';

    //图书模型
    var Book  = Backbone.Model.extend({
        name:"",
        price:0,
        publisher:""
    });
    var book = new Book();

    //图书类
    var BookSelf = Backbone.Collection.extend({
        Model:Book
    });

    var bookSelf = new BookSelf();

    //异步加载数据
    bookSelf.url = "/resource/data/books.json";
    bookSelf.fetch({
        success:function(collection,response,options){
            collection.each(function(b){
                book.set({name:b.get('name'),price:b.get('price'),publisher:b.get('publisher')});
            });
        },
        error:function(collection,response,options){
            alert("error");
        }
    });

    //对应着每一条数据
    var ItemView = Backbone.View.extend({
        el:$("#book-list"),
        initialize:function(){
            this.listenTo(this.model, "change", this.addOne);
        },
        events:{
            "click .btn-danger" : "delete"
        },
        delete:function(e){
            $(e.target).parent("li").remove();
        },
        addOne:function(){
            this.render(this.model.toJSON());
        },
        render:function(obj){
            $("#book-list").append(_.template(temp)(obj));
        }
    });

    /*显示整体*/
    var AppView = Backbone.View.extend({
        el:$(".container"),
        //new 一个view时会自动加载这个方法
        initialize:function(){
            var itemView = new ItemView({model:book});
        },
        events:{
            "click #add" :  "add"
        },
        add:function(){
            var name = $("#name").val();
            var price = $("#price").val();
            var publisher = $("#publisher").val();
            book.set({name:name,price:price,publisher:publisher});
            bookSelf.add(book);
            $("#name,#price,#publisher").val("");
        }
    });

    var app = new AppView();
    
});