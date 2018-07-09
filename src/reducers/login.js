import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';

const login = handleActions({
    //登录请求
    ['LOGIN/POST'](state, action) {
        return {...state, username: action.username, password: action.password, };
    },
    ['LOGIN/POST/SUCCESS'](state, action) {
        return {...state, logindata: action.logindata, };
    },
    //登出请求
    ['LOGOUT/POST'](state) {
        return {...state, token: '', logindata:{},};
    },
    ['FORGET/GET'](state, action) {
        return {...state, phone: action.phone }
    },
    //设置state
    ['SET/STATUS'](state, action) {
        return {...state, status: action.status, };
    },
    ['SET/CODE'](state, action) {
        return {...state, code: action.code, };
    },
}, {
    token: '',
    status: true,
    logindata:{},
    code: 60,
    username: '',
    password: '',
    info: {},
});

export default login;