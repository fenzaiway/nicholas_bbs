/*module.exports = {
  //配置项: 配置值
  port: 8360, //监听的端口
  db_type: 'mysql', // 数据库类型
  db_host: '127.0.0.1', // 服务器地址
  db_port: '3306', // 端口
  db_name: 'nicholas_bbs', // 数据库名
  db_user: 'root', // 用户名
  db_pwd: '123456', // 密码
  db_prefix: 't_', // 数据库表前缀
  app_group_list:["Home","Admin"],//分组列表
  url_resource_reg:/^(upload\/|resource\/|static\/|favicon\.ico|robot\.txt)/
};*/
module.exports = {
  //配置项: 配置值
  port: 80, //监听的端口
  db_type: 'mysql', // 数据库类型
  db_host: '127.0.0.1', // 服务器地址
  db_port: '3306', // 端口
  db_name: 'nicholas_bbs', // 数据库名
  db_user: 'root', // 用户名
  db_pwd: '123456', // 密码
  db_prefix: 't_', // 数据库表前缀
  app_group_list:["Home","Admin","Demo","Ueditor"],
  post_file_upload_path: APP_PATH + '/Runtime/upload', //文件上传的临时目录
  'url_route_on': true //默认情况下开启自定义路由
};