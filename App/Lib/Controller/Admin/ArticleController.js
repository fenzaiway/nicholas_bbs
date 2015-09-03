module.exports = Controller("Admin/BaseController",function(){
	return {
		///admin/article/articleType
		//获取文章类型
		articleTypeAction:function(){
			var self = this;
			D("BlogType").where({}).select().then(function(data){
				self.json(data);
			});
		},
		//admin/article/saveArticle
		//保存新文章
		saveArticleAction:function(){
			var self = this;
			var title = self.post("title");
			var typeId = self.post("typeId");
			var content = self.post("content");

			var data = {};
			data.t_title = title;
			data.t_type_id = typeId;
			data.t_content = content;

			D("BlogArticle").add(data).then(function(insertId){
				self.redirect("/admin/index/index");
			});
		},
		//更新前
		///admin/article/preUpdateArticle
		preUpdateArticleAction:function(){
			var self = this;
			var t_id = self.get("tid");
			D("BlogArticle").where({t_id:t_id}).select().then(function(data){
				self.assign({
					"title":"更新文章",
					"data":data[0]
				});
				self.display("Admin/update_article.html");
			});
		},
		///admin/article/updateArticleAction
		updateArticleAction:function(){
			var self = this;
			var tid = self.post("tid");
			var title = self.post("title");
			var typeId = self.post("typeId");
			var content = self.post("content");

			var data = {};
			data.t_title = title;
			data.t_type_id = typeId;
			data.t_content = content;
			D("BlogArticle").where({t_id:['=',tid]}).update(data).then(function(){
				self.redirect("/admin/index/index");
			});

		},
		articleListAction:function(){
			var self = this;

			D("BlogArticle").count("t_id").then(function(count){
				var pageNow = self.get("pageNow");
				var pageSize = self.get("pageSize");
				D("BlogArticle").page(pageNow,pageSize).field(['t_id','t_title','t_time']).order('t_id desc').select().then(function(data){
					self.json({
						"count":count,
						"pages":data
					});
				});
			});
		},
		articleDeleteAction:function(){
			var self = this;
			var tid = self.get("tid");
			D("BlogArticle").where({'t_id':['=',tid]}).delete().then(function(affectedRows){
				var result = {};
				if(affectedRows > 0){
					result.msg = 0;
				}else{
					result.msg = -1;
				}
				self.json(result);
			});
		}
	};
});