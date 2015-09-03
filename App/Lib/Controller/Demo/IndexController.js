/**
	demo控制类
*/
module.exports = Controller("Demo/BaseController",function(){
	"use strict";

	return {
		indexAction:function(){
			var self = this;
			self.assign("title","Nicholas学习Demo");
			self.display();
		},
		demoRouteAction:function(){
			var self = this;
			var src = self.get('src');
			self.display('Demo/demo/' + src + '.html');
		}
	}
})