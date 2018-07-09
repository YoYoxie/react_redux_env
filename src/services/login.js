import xAjax from './xAjax';
import API from './api';

export async function postLogin(username, password) {
    const items = {
        headers: {"X-TARGET-APP":"app_bss"},
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password
        })
    }
    return xAjax(API.LOGIN, items);
}

export async function postLogout() {
    const items = {
        method: "POST",
    }
    return xAjax(API.LOGOUT, items);
}
export async function getForget(phone) {
    return xAjax(API.FORGET + '?phone=' + phone);
}
export async function patchReset(info) {
    const items = {
        method: "PATCH",
        body: JSON.stringify(info)
    }
    return xAjax(API.FORGET, items);
}
