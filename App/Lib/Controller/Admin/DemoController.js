module.exports = Controller("Admin/BaseController",function(){
    return {
        auditAction:function(){
            var self = this;
            self.assign("title","demo审核");
            self.display("Admin/demo_list.html");
        },
        auditPageAction:function(){
            var self = this;
            var pageNow = self.get("pageNow") || 1;
            var pageSize = self.get("pageSize") || 10;
            D("BlogDemo").where({}).page(pageNow, pageSize).order('t_id desc').countSelect().then(function(data){
                self.json(data);
            });
        },
        auditUpdateAction:function(){
            var self = this;
            var status = self.get("status");
            var t_id = self.get("t_id");

            D("BlogDemo").where({"t_id":["=",t_id]}).update({"t_status":status});

            self.redirect("/admin/demo/audit.html");
        }
    }
});