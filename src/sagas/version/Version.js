import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import cookie from 'js-cookie';
import { getVersionList,postVersion,getVersionListOne,deleteVersionListOne } from '../../services/version/Version';
import { message,notification } from 'antd';
/*
    组织架构-账号请求
*/
function* getVersion(action) {
    try {
        const { jsonResult } = yield call(getVersionList,action.info);
        if (jsonResult.ok) {
            yield put({
                type: 'VERVERSION/GET/SUCCESS',
                list: jsonResult.data
            });
        }
    } catch (error) {
        console.log("getVersion err");
        console.log(error);
        yield put({
            type: 'VERVERSION/CLEAR/LIST',
        });
        notification['error']({
            message: '页面异常',
        })
    }
}
// 获得单个
function* getVersionOne(action) {
    try {
        const { jsonResult } = yield call(getVersionListOne, action.formid);
        if (jsonResult.ok) {
            yield put({
                type: 'VERVERSION/GET/ONE/SUCCESS',
                formdata: jsonResult.data,
            });
            notification['success']({
                message: '激活成功'
            })
            yield put({
                type: 'VERVERSION/GET',
                info: {
                    page:0,
                    size:10
                },
            });
        }
    } catch (error) {
        notification['error']({
                message: '激活失败'
            })
        console.log("getVersionOne err");
        message.error(error);
    }
}
// 创建
function* postVersionCreate(action) {
    try {
        const { jsonResult } = yield call(postVersion)
        if (jsonResult.ok) {
            yield put({
                type: 'VERVERSION/SET/STATUS',
                status: true
            });
            yield put({
                type: 'MODLIBRARY/GET',
                info:{
                    page:0,
                    size:10
                }
            })
            yield put({
                type: 'MODLIBRARY/SET/LOADING',
                loading: false,
            })
            yield put({
                type: 'MODLIBRARY/SET/LOAD',
                load: false,
            })
            notification['success']({
                message: '发布成功'
            })
        }else{
            notification['error']({
                message: '发布失败',
            });
            yield put({
                type: 'MODLIBRARY/SET/LOADING',
                loading: false,
            })
            yield put({
                type: 'MODLIBRARY/SET/LOAD',
                load: false,
            })
        }
    }catch (error) {
        console.log("postVersionCreate err");
        message.error(error);
    }
}
// 删除
function* deleteVersion(action) {
    try {
        const { jsonResult } = yield call(deleteVersionListOne, action.formid)
        if (jsonResult.ok) {
            yield put({
                type: 'VERVERSION/SET/STATUS',
                status: true
            });
            notification['success']({
                message: '删除成功'
            })
            yield put({
                type: 'VERVERSION/GET',
                info: {
                    page:0,
                    size:10
                },
            });
        }else{
            notification['error']({
                message: jsonResult.errorCode,
                description: jsonResult.errorMsg
            });
            yield put({
                type: 'VERVERSION/SET/LOADING',
                loading: false
            });
        }
    }catch (error) {
        console.log("deleteVersion err");
        message.error(error);
    }
}

//事件监听

function* watchVersion() {
    yield takeLatest('VERVERSION/GET', getVersion)
}
function* watchVersionOne() {
    yield takeLatest('VERVERSION/GET/ONE', getVersionOne)
}
function* watchVersionCreate() {
    yield takeLatest('VERVERSION/POST/CREATE', postVersionCreate)
}
function* watchVersionDelete() {
    yield takeLatest('VERVERSION/DELETE', deleteVersion)
}
//启动配置
export default function* () {
    yield fork(watchVersion);
    yield fork(watchVersionOne);
    yield fork(watchVersionCreate);
    yield fork(watchVersionDelete);
}
