define(function(require, exports, module){
	require('jquery');
	;(function($){

	var _id = "ni-mask";
	var _imgId = "ni-img-zoom";
	var $id = $("#"+_id);
	var $img = $("#"+_imgId);
	var _default = {
		'opacity':0.3,
		'background-color':'rgb(0,0,0)'
	}

	/*创建遮罩层*/
	function createMask(opts){
		if(!$id.html()){
			var maskHtml = '<div id="'+_id+'" style="background-color:'+opts["background-color"]+';opacity:'+opts["opacity"]+';z-index:9999;position:absolute;left:0px;top:0px;width:'+document.body.offsetWidth+'px;height:'+document.body.offsetHeight+'px;display:none;"></div>';
			$('body').append(maskHtml);
			$id = $("#"+_id);
		}
		show();
		$id.on('click',function(){
			hide();
		})
		
	}

	//显示
	function show(){
		$id.css('display',"block");
	}

	//创建图片图层
	function createImg(obj){
		var imgHtml = '<div style="position:absolute;z-index:10000;background-color:#fff;" id="'+_imgId+'"></div>';
		var imgHeight = obj.height();
		var imgWidth = obj.width();
		$("body").append(imgHtml);
		$img = $("#"+_imgId);
		var clientHeight = $('body')[0].clientHeight;
		var clientWidth = $('body')[0].clientWidth;
		var top = window.scrollY+($('body')[0].clientHeight-imgHeight)/2+"px";	
		var left = window.scrollX+($('body')[0].clientWidth-imgWidth)/2+"px";	
		$img.css({
			'left':left,
			'top':top,
			'width':imgWidth,
			'height':imgHeight
		}).html($(obj[0].outerHTML));
	}

	//隐藏
	function hide(){
		$id.css('display','none');
		$img.remove();
	}

	//基于fn添加图片放大镜命名空间
	$.fn.imgZoom = function(options){
		var opts = $.extend({},_default,options);
		return this.each(function(){
			var  _self = $(this);
			_self.mouseover(function(){
				_self.attr('title','点击放大').css("cursor","pointer");
			}).mouseout(function(){
				_self.removeAttr('title');
			}).click(function(){
				createMask(opts);
				createImg(_self);
			});
		});
	}
	//滚动时重新定位
	window.onscroll = function(){
		if($img.html()){
			$img.css("top",(window.scrollY+($('body')[0].clientHeight-$img.height())/2)+"px");
		}
	};
})(jQuery);
});