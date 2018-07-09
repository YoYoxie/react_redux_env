/*
    车型库-事件
*/
//获取数据列表
export function modbasicget(info) {
    return {
        type: 'MODBASIC/GET',
        info: info,
    }
}
//获取数据列表
export function modbasicmakerget(info) {
    return {
        type: 'MODBASIC/GET/MAKER',
        makerinfo: info,
    }
}
//获取数据列表
export function modbasicbrandget(info) {
    return {
        type: 'MODBASIC/GET/BRAND',
        brandinfo: info,
    }
}
//获取数据列表
export function modbasicseriesget(info) {
    return {
        type: 'MODBASIC/GET/SERIES',
        seriesinfo: info,
    }
}
//获取数据列表
export function modbasicgenreationget(info) {
    return {
        type: 'MODBASIC/GET/GENREATION',
        genreationinfo: info,
    }
}
//获取数据详情
export function modbasicgetone(formid) {
    return {
        type: 'MODBASIC/GET/ONE',
        formid: formid,
    }
}
//设置moadl
export function modbasicmodal(modal) {
    return {
        type: 'MODBASIC/SET/MODAL',
        modal: modal,
    }
}
//设置moadl
export function modbasiceditmodal(editmodal) {
    return {
        type: 'MODBASIC/SET/EDITMODAL',
        editmodal: editmodal,
    }
}
//设置status
export function modbasicstatus(status) {
    return {
        type: 'MODBASIC/SET/STATUS',
        status: status,
    }
}
//设置load
export function modbasicload(load) {
    return {
        type: 'MODBASIC/SET/LOAD',
        load: load,
    }
}
//设置loading
export function modbasicloading(loading) {
    return {
        type: 'MODBASIC/SET/LOADING',
        loading: loading,
    }
}
//设置uploading
export function modbasicuploading(uploading) {
    return {
        type: 'MODBASIC/SET/UPLOADING',
        uploading: uploading,
    }
}
//上传
export function modbasicpost(filedata) {
    return {
        type: 'MODBASIC/POST/CREATE',
        filedata: filedata,
    }
}
//更新
export function modbasicput(formdata) {
    return {
        type: 'MODBASIC/PUT/UPDATE',
        formdata: formdata,
    }
}