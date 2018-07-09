import xFetch from '../xFetch';
import API from '../api';
/*
    组织架构-账号接口
*/
export async function getModelLibraryList(info) {
    let items = '';
    for (let i in info) {
        if (info[i] != undefined) {
            items += i + '=' + info[i] + '&';
        }
    }
    let item = items.slice(0, -1);
    return xFetch(API.VEHICLE + '/spec/brief?' + item);
}
//请求单条
export async function getModelLibraryListOne(formid) {
    return xFetch(API.VEHICLE  + '/model/config/' + formid);
}
//新增数据
export async function postModelLibrary(filedata) {
    const items = {
        method: "POST",
        body: JSON.stringify({
            file: filedata.file,
            type: filedata.type
        })
    }
    return xFetch(API.UPLOAD, items);
}
