/*
    车型库-事件
*/
//获取数据列表
export function modlibraryget(info) {
    return {
        type: 'MODLIBRARY/GET',
        info: info,
    }
}
//获取数据详情
export function modlibrarygetone(formid) {
    return {
        type: 'MODLIBRARY/GET/ONE',
        formid: formid,
    }
}
//设置moadl
export function modlibrarymodal(modal) {
    return {
        type: 'MODLIBRARY/SET/MODAL',
        modal: modal,
    }
}
//设置status
export function modlibrarystatus(status) {
    return {
        type: 'MODLIBRARY/SET/STATUS',
        status: status,
    }
}
//设置load
export function modlibraryload(load) {
    return {
        type: 'MODLIBRARY/SET/LOAD',
        load: load,
    }
}
//设置loading
export function modlibraryloading(loading) {
    return {
        type: 'MODLIBRARY/SET/LOADING',
        loading: loading,
    }
}
//设置uploading
export function modlibraryuploading(uploading) {
    return {
        type: 'MODLIBRARY/SET/UPLOADING',
        uploading: uploading,
    }
}
//上传
export function modlibrarypost(filedata) {
    return {
        type: 'MODLIBRARY/POST/CREATE',
        filedata: filedata,
    }
}
