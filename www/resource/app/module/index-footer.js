/**
 * 默认加载
 */
define(function(require, exports, module){
    require("jquery");
    require("bootstrap");
    require("backToTop");
    require("imgZoom");
    var footer = function(){
        $('img').imgZoom();
    }
    module.exports = {footer:footer};
});