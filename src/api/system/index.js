import http from '../api.base';
export default {
    //接口权限全量接口  /v1.0.0/adminmgm/apipermissions
    getInterfaceAuthority() {
        return http.get('/v1.0.0/adminmgm/apipermissions');
    },
    //数据权限全量接口 /v1.0.0/adminmgm/datapermissions
    getDataAuthority () {
        return http.get('/v1.0.0/adminmgm/datapermissions');
    },
    //权限列表/v1.0.0/adminmgm/listSysRoleInfo
    getAuthorityList(){
        return http.get('/cmsapi/sys/listSysRoleInfo');
    },
    //根据角色code和功能类型获取权限信息 v1.0.0/adminmgm/listSysRoleInfo
    getAuthorityInfoByCode(params){
        return http.get('/cmsapi/sys/sysRoleAuthByRoleCodeAndAuthType',{params: params});
    },
    //保存菜单权限
    saveMenuRoleAuth(params){
        return http.postJson('/cmsapi/sys/saveRoleAuth',params);
    },
    //获取用户列表
    getUserList(params){
        return http.post('/cmsapi/userlist',params);
    },
    //添加用户
    addUser(params){
        return http.post('/cmsapi/user/increase',params);
    }
}
