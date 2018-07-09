
import cookie from 'js-cookie';

function jsonParse(res) {
  return res.json().then(jsonResult => ({...res, jsonResult }));
}

function xAjax(url, options) {
    //console.log(url);
    const opts = {...options};
    opts.headers = {
        ...opts.headers,
        "Content-Type": "application/json",
        "Authorization": cookie.get('authorization') || '',
    };
    //console.log(opts);
    //url = "http://p-api.dev.kkche.cn/v1" + url;

    return fetch(url, opts)
        .then(jsonParse);
}

export default xAjax;
