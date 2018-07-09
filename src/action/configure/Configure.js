/*
    车型配置库-事件
*/
//获取数据列表
export function conconfigget(info) {
    return {
        type: 'CONCONFIG/GET',
        info: info,
    }
}
//获取数据详情
export function conconfiggetone(formid) {
    return {
        type: 'CONCONFIG/GET/ONE',
        formid: formid,
    }
}
//设置moadl
export function conconfigmodal(modal) {
    return {
        type: 'CONCONFIG/SET/MODAL',
        modal: modal,
    }
}
//设置status
export function conconfigstatus(status) {
    return {
        type: 'CONCONFIG/SET/STATUS',
        status: status,
    }
}
//设置load
export function conconfigload(load) {
    return {
        type: 'CONCONFIG/SET/LOAD',
        load: load,
    }
}
//设置loading
export function conconfigloading(loading) {
    return {
        type: 'CONCONFIG/SET/LOADING',
        loading: loading,
    }
}
//编辑更新
export function conconfigupdate(formdata) {
    return {
        type: 'CONCONFIG/PUT/UPDATE',
        formdata: formdata,
    }
}
