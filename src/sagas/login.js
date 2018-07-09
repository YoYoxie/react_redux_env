import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import cookie from 'js-cookie';
import { postLogin, postLogout, getForget, patchReset } from '../services/login';
import { message, notification } from 'antd';

/*
 * 一个 saga 就是一个 Generator Function
 *
 * 每当 store.dispatch `LOGIN` action 的时候都会调用 loginPost.
 */

function* loginPost(action) {
    try {
        const { jsonResult } = yield call(postLogin, action.username, action.password);
        if (jsonResult.ok&&jsonResult.data.token) {
            cookie.set('authorization', jsonResult.data.token);
            // cookie.set('userId',jsonResult.data.userId);
            yield put({
                type: 'LOGIN/POST/SUCCESS',
                logindata: jsonResult.data
            });
            notification['success']({
                message: '登录成功',
            })
        }else{
            notification['error']({
                // message: jsonResult.errorMsg,
                message: '账号或密码错误',
            })
        }
    } catch (error) {
        console.log(error);

    }
}
function* logoutPost(action) {
    try {
        const { jsonResult } = yield call(postLogout);
        if (jsonResult.ok) {
            cookie.set('authorization', '');
            cookie.set('userId', '');
            cookie.set('userName', '');
            this.props.history.push('/');
            // location.href = '/';
        }
    } catch (error) {
        console.log(error);
    }
}
function* forgetGet(action) {
    try {
        const { jsonResult } = yield call(getForget, action.phone);
        console.log(jsonResult);
        if (jsonResult.ok) {
            notification['success']({
                message: '验证码发送成功',
            })
        }else{
            notification['error']({
                message: jsonResult.errorMsg,
            })
        }
    } catch (error) {
        console.log(error);
    }
}
function* resetPatch(action) {
    try {
        const { jsonResult } = yield call(patchReset, action.info);
        if (jsonResult.ok) {
            notification['success']({
                message: '密码重置成功',
            })
            yield put({
                type: 'SET/STATUS',
                status: true
            });
        }else{
            notification['error']({
                message: jsonResult.errorMsg,
            })
        }
    } catch (error) {
        console.log(error);
    }
}

function* watchLogin() {
    yield takeLatest('LOGIN/POST', loginPost)
}
function* watchLogout() {
    yield takeLatest('LOGOUT/POST', logoutPost)
}
function* watchForget() {
    yield takeLatest('FORGET/GET', forgetGet)
}
function* watchReset() {
    yield takeLatest('RESET/PATCH', resetPatch)
}
export default function* () {
    yield fork(watchLogin);
    yield fork(watchLogout);
    yield fork(watchForget);
    yield fork(watchReset);
}
