//登录
export function loginpost(username, password) {
    return {
        type: 'LOGIN/POST',
        username: username,
        password: password
    }
}
//登出
export function logoutpost() {
    return {
        type: 'LOGOUT/POST',
    }
}
//设置Status
export function setstatus(status) {
    return {
        type: 'SET/STATUS',
        status: status
    }
}
//设置Code
export function setcode(code) {
    return {
        type: 'SET/CODE',
        code: code
    }
}
//忘记密码
export function forgetpassword(phone) {
    return {
        type: 'FORGET/GET',
        phone: phone
    }
}
//重置密码
export function resetpassword(info) {
    return {
        type: 'RESET/PATCH',
        info: info
    }
}