import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import cookie from 'js-cookie';
import { getConfigureList,postConfigure,putConfigure } from '../../services/configure/Configure';
import { message,notification } from 'antd';
/*
    组织架构-账号请求
*/
function* getConfigure(action) {
    try {
        const { jsonResult } = yield call(getConfigureList,action.info);
        if (jsonResult.ok) {
            yield put({
                type: 'CONCONFIG/GET/SUCCESS',
                list: jsonResult.data
            });
        }
    } catch (error) {
        console.log("getConfigure err");
        console.log(error);
        yield put({
            type: 'CONCONFIG/CLEAR/LIST',
        });
        notification['error']({
            message: '页面异常',
        })
    }
}

// 创建
function* postConfigureCreate(action) {
    try {
        const { jsonResult } = yield call(postConfigure, action.formdata)
        if (jsonResult.ok) {
            yield put({
                type: 'CONCONFIG/SET/STATUS',
                status: true
            });
            notification['success']({
                message: '添加成功'
            })
        }else{
            notification['error']({
                message: jsonResult.errorCode,
                description: jsonResult.errorMsg
            });
            yield put({
                type: 'CONCONFIG/SET/LOADING',
                loading: false
            });
        }
    }catch (error) {
        console.log("postConfigureCreate err");
        message.error(error);
    }
}
// 编辑更新
function* putConfigureUpdate(action) {
    try {
        const { jsonResult } = yield call(putConfigure, action.formdata)
        if (jsonResult.ok) {
            yield put({
                type: 'CONCONFIG/SET/STATUS',
                status: true
            });
            notification['success']({
                message: '更新成功'
            })
        }else{
            notification['error']({
                message: jsonResult.errorCode,
                description: jsonResult.errorMsg
            });
            yield put({
                type: 'CONCONFIG/SET/LOADING',
                loading: false
            });
        }
    }catch (error) {
        console.log("putConfigureUpdate err");
        message.error(error);
    }
}

//事件监听

function* watchConfigure() {
    yield takeLatest('CONCONFIG/GET', getConfigure)
}

function* watchConfigureCreate() {
    yield takeLatest('CONCONFIG/POST/CREATE', postConfigureCreate)
}
function* watchConfigureUpdate() {
    yield takeLatest('CONCONFIG/PUT/UPDATE', putConfigureUpdate)
}
//启动配置
export default function* () {
    yield fork(watchConfigure);
    yield fork(watchConfigureCreate);
    yield fork(watchConfigureUpdate);
}
