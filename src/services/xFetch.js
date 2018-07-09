import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import { notification } from 'antd';

var crypto = require('crypto');

const errorMessages = (res) => `${res.status} ${res.statusText}`;

function check200(res) {
    if(res.status !== 200){
        let data = new Date();
        cookie.set('datatime', data.getTime());
    }
    return res;
}

function check401(res) {
    if (res.status === 401) {
        // location.href = '#/login';
    }
    return res;
}

function check403(res) {
    if (res.status === 403) {
        notification['error']({
            message: '您无权限访问',
        })
    }
    return res;
}
function check503(res) {
    if (res.status === 503) {
        return Promise.reject(errorMessages(res));
    }
    return res;
}

function jsonParse(res) {
    return res.json().then(jsonResult => ({...res, jsonResult }));
}

// function errorMessageParse(res) {
//     const { ok, errorMsg } = res.jsonResult;
//     if (!ok) {
//         return Promise.reject(errorMsg);
//     }
//     return res;
// }

function xFetch(url, options) {
    const opts = {...options };
    if(opts.method == 'POST'){
        opts.headers = {
            ...opts.headers,
            "X-SUBMIT-IDENTITY": crypto.createHash('md5').update(JSON.stringify(opts.body)+cookie.get('datatime')).digest('hex'),
            "Content-Type": "application/json",
            "Authorization": cookie.get('authorization') || '',
        };
    }else{
        opts.headers = {
            ...opts.headers,
            "Content-Type": "application/json",
            "Authorization": cookie.get('authorization') || '',
        };
    }

    // console.log(opts);
    //url = "http://p-api.dev.kkche.cn/v1" + url;

    // return fetch(url, opts)
    //     .then(check200)
    //     .then(check401)
    //     .then(check403)
    //     .then(check503)
    //     .then(jsonParse);
    return fetch(url,opts)
        .then(check200)
        .then(check401)
        .then(check403)
        .then(check503)
        .then(jsonParse);    
}

export default xFetch;
