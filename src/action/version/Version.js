/*
    车型版本库-事件
*/
//获取数据列表
export function verversionget(info) {
    return {
        type: 'VERVERSION/GET',
        info: info,
    }
}
//获取数据详情
export function verversiongetone(formid) {
    return {
        type: 'VERVERSION/GET/ONE',
        formid: formid,
    }
}
//设置moadl
export function verversionmodal(modal) {
    return {
        type: 'VERVERSION/SET/MODAL',
        modal: modal,
    }
}
//设置status
export function verversionstatus(status) {
    return {
        type: 'VERVERSION/SET/STATUS',
        status: status,
    }
}
//设置load
export function verversionload(load) {
    return {
        type: 'VERVERSION/SET/LOAD',
        load: load,
    }
}
//设置loading
export function verversionloading(loading) {
    return {
        type: 'VERVERSION/SET/LOADING',
        loading: loading,
    }
}
//发布
export function verversionpost() {
    return {
        type: 'VERVERSION/POST/CREATE',
    }
}
//删除
export function verversiondelete(formid) {
    return {
        type: 'VERVERSION/DELETE',
        formid: formid,
    }
}