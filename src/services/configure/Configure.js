import xFetch from '../xFetch';
import API from '../api';
/*
    组织架构-账号接口
*/
export async function getConfigureList(info) {
    let items = '';
    for (let i in info) {
        if (info[i] != undefined) {
            items += i + '=' + info[i] + '&';
        }
    }
    let item = items.slice(0, -1);
    return xFetch(API.VEHICLE + '/spec/brief?' + item);
}
//新增数据
export async function postConfigure(formdata) {
    const items = {
        method: "POST",
        body: JSON.stringify(formdata)
    }
    return xFetch(API.CONFIG, items);
}
//更新数据
export async function putConfigure(formdata) {
    const items = {
        method: "PUT",
        body: JSON.stringify(formdata)
    }
    return xFetch(API.CONFIG , items);
}