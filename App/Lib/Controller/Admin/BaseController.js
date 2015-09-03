
module.exports = Controller(function(){
	"use strict";
	return {
		init:function(http){
			this.super("init",http);
			 //其他的通用逻辑
		      var self = this;
		      if(http.action === "login"){
		      	return;
		      }
		      console.info('------aaaa--------');
		      if(http.action !== "toLogin"){
		      	 return self.session("userinfo").then(function(data){
			      	if(isEmpty(data)){
			      		return self.redirect("/admin/index/toLogin");
			      	}else{
			      		self.assign("username",data.username);
			      		return;
			      	}
			      });
		      }
		}
	}
});






/*init:function(http){
	this.super('init',http);

	//login请求不判断是否已经登录
	if(this.http.action === 'login'){
		return;
	}

	var self = this;

	return self.session('userinfo').then(function(userinfo){
		if(isEmpty(userinfo)){
			if(self.isAjax()){
				return self.error(403);
			}else{
				return self.redirect("login");
			}
		}else{
			self.userinfo = userinfo;
			self.assign('userinfo',userinfo);
		}
	});
}*/