var fs = require("fs");

module.exports = Controller("Admin/BaseController",function(){

	return {
		indexAction:function(){
			var self = this;
			self.assign("title","管理员首页");
			self.display();
		},
		toLoginAction:function(){
			var self = this;
			self.display("Admin/login.html");
		},
		loginAction:function(){
			var self = this;
	    	var username = self.post("username");
	    	var password = self.post("password");
	    	if(username === "admin" && password === "123"){
	    		self.session("userinfo",{username:username});
	    		self.redirect("/admin/");
	    	}else{
	    		self.redirect("/admin/index/toLogin");
	    	}
		},
		logoutAction:function(){
			var self = this;
			self.session().then(function(){
				self.redirect("/admin");
			});
		},
		//
		articleEditAction:function(){
			var self = this;
			self.assign("title","发表新文章");
			self.display("Admin/new_article.html");
		}
	};

});







/*//登录
loginAction:function(){
	var self = this;

	if(self.isPost()){
		var name = self.post("name");
		var pwd = self.post("pwd");

		return D("User").where({
			name:name,
			pwd:md5(pwd)
		}).find().then(function(data){
			if(isEpmty(data)){
				return self.error(403,'用户名或者密码不正确');
			}else{
				return self.session('userinfo',data);
			}
		}).then(function(){
			return self.redirect('index');
		});
	}else{
		self.assign({"title","管理-登录"});
		return self.display();
	}
}

//首页
indexAction:function(){
	var userinfo = this.userinfo;
	var self = this;

	if(!isEpmty(userinfo)){

		var brandModel = D('Brand');
		var brandData = [];

		brandModel.getBrand().then(function(data){
			userinfo.name === 'admin'?brandData=data:brandData=[];
			self.assign("title","管理-首页",'brand':brandData,'user':userinfo);
			return self.display();
		});

	}
}

//注销
logoutAction:function(){
	var self = this;
	self.session('userinfo');
	self.redirect('login');
};

addAction:function(){
	var self = this;
	var where = {
		name:""
	};


	if(self.isPost()){
		var brandModel = D("Brand");
		var pData = self.post();

		//获取上传的图片
		var VBimg = self.file("img");
		var finalFileName = this.utilUploadImg(pData.name,vBimg.path);

		where.name = pData.name;

		//保存数据到数据库中
		pData.img = finalFileName;
		brandModel.thenAdd(pData,where,true).then(function(insertId){
			if(insertId.type === 'add'){
				return self.redirect("/home/index/index");
			}else{
				return self.error(insertId.type);
			}
		});
	}else{
		self.assign({
			"title":"管理-新增品牌"
		});
		return self.display();
	}
};

utilUploadImg:function(upImgName,upImgPath){
	var extension = "";
	var finalFileName = "";

	upImgPath.indexOf("png") !== -1 ? extension='.png':extension='.jpg';
	finalFileName = new Date().getTime()+extension;

	//读取文件
	fs.readFile(upImgPath,function(err,data){
		if(err)
		{
			console.log('error where reading file');
		}else{
			//写文件
			fs.writeFile('upload/' + finalFileName,data,function(err){
				if(err){
					console.log('error when write file');
				}else{
					console.log('saved');
				}
			})
		}
	});

	return finalFileName;
}

//删除对应数据项
delAction:function(){
	var self = this;
	if(self.isGet()){
		var id = this.get("id");
		D("item").where({"id":id}).delete().then(function(affectedRows){
			if(affectedRows > 0){
				return self.redirect("index");
			}
		});
	}
}

//修改对应数据项
updateAction:function(){
	var self = this;
	var id = 0;

	if(self.isGet()){
		id = self.get("id");

		D("Brand").where({"id":id}).find().then(function(theBrand){
			self.assign({
				"title":"管理-修改",
				"brand":theBrand
			});
			self.display();
		})
	}else if(self.isPost()){
		var updateData = self.post();
		var VBimg = self.file("img");

		if(vBimg.originalFileName !== ''){
			var finalFileName = this.utilUploadImg(updateData.name,VBimg.path);
			updateData.img = finalFileName;
		}

		id = self.post("id");
		D("Brand").where({"id":id}).update(updateData).then(function(affectedRows){
			if(affectedRows > 0){
				return self.redirect("/home/index/index");
			}
		});
	}
}*/