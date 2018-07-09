import xFetch from '../xFetch';
import API from '../api';
/*
    车型库管理-车型基础库
*/
export async function getModelBasicList(info) {
    let items = '';
    for (let i in info) {
        if (info[i] != undefined) {
            items += i + '=' + info[i] + '&';
        }
    }
    let item = items.slice(0, -1);
    return xFetch(API.VEHICLE + '/spec/brief?' + item);
}
export async function getModelBasicMakerList(info) {
    let items = '';
    for (let i in info) {
        if (info[i] != undefined) {
            items += i + '=' + info[i] + '&';
        }
    }
    let item = items.slice(0, -1);
    return xFetch(API.MAKER + '?' + item);
}
export async function getModelBasicBrandList(info) {
    let items = '';
    for (let i in info) {
        if (info[i] != undefined) {
            items += i + '=' + info[i] + '&';
        }
    }
    let item = items.slice(0, -1);
    return xFetch(API.BRAND + '?' + item);
}
export async function getModelBasicSeriesList(info) {
    let items = '';
    for (let i in info) {
        if (info[i] != undefined) {
            items += i + '=' + info[i] + '&';
        }
    }
    let item = items.slice(0, -1);
    return xFetch(API.SERIES + '?' + item);
}
export async function getModelBasicGenreationList(info) {
    let items = '';
    for (let i in info) {
        if (info[i] != undefined) {
            items += i + '=' + info[i] + '&';
        }
    }
    let item = items.slice(0, -1);
    return xFetch(API.GENREATION + '?' + item);
}
//请求单条
export async function getModelBasicListOne(formid) {
    return xFetch(API.VEHICLE + '/spec/brief/' + formid);
}
//新增数据
export async function postModelBasic(filedata) {
    const items = {
        method: "POST",
        body: JSON.stringify({
            file: filedata.file,
            type: filedata.type
        })
    }
    return xFetch(API.UPLOAD, items);
}
//更新数据
export async function putModelBasic(formdata) {
    const items = {
        method: "PUT",
        body: JSON.stringify(formdata)
    }
    return xFetch(API.VEHICLE + '/spec/brief' , items);
}