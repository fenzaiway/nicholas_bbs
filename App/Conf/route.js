//自定义路由规则
module.exports = [
    ["detail/:id", "home/index/articleDetail"],
    ["nav","home/index/nav"],
    ["demo","demo/index/index"],
    ["d/:src","demo/index/demoRoute"],
    ["search/:kw","Home/Search/index"],
    ["page/:pageNow","Home/index/index"],
]