module.exports = Controller("Admin/BaseController",function(){
	return {
		addNavAction:function(){
			var self = this;
			self.display("Admin/add_nav.html");
		},
		saveNavAction:function(){
			var self = this;
			var title = self.post("title");
			var link = self.post("link");
			var description = self.post("description");

			var data = {
				"t_title":title,
				"t_link":link,
				"t_description":description
			};

			D("FrontNav").add(data).then(function(insertId){
				self.redirect("/admin/nav/addNav.html");
			});
		}
	};
})