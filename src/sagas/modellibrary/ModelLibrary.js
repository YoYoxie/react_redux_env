import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import cookie from 'js-cookie';
import { getModelLibraryList,postModelLibrary,getModelLibraryListOne } from '../../services/modellibrary/ModelLibrary';
import { message,notification } from 'antd';
/*
    组织架构-账号请求
*/
function* getModelLibrary(action) {
    try {
        const { jsonResult } = yield call(getModelLibraryList,action.info);
        if (jsonResult.ok) {
            yield put({
                type: 'MODLIBRARY/GET/SUCCESS',
                list: jsonResult.data
            });
        }
    } catch (error) {
        console.log("getModelLibrary err");
        console.log(error);
        yield put({
            type: 'MODLIBRARY/CLEAR/LIST',
        });
        notification['error']({
            message: '页面异常',
        })
    }
}
// 获得单个
function* getModelLibraryOne(action) {
    try {
        const { jsonResult } = yield call(getModelLibraryListOne, action.formid);
        if (jsonResult.ok) {
            yield put({
                type: 'MODLIBRARY/GET/ONE/SUCCESS',
                formdata: jsonResult.data,
            });
        }
    } catch (error) {
        console.log("getModelLibraryOne err");
        message.error(error);
    }
}
// 创建
function* postModelLibraryCreate(action) {
    try {
        const { jsonResult } = yield call(postModelLibrary, action.filedata)
        if (jsonResult.ok) {
            yield put({
                type: 'MODLIBRARY/SET/STATUS',
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
                type: 'MODLIBRARY/SET/LOADING',
                loading: false
            });
        }
    }catch (error) {
        console.log("postModelLibraryCreate err");
        message.error(error);
    }
}

//事件监听

function* watchModelLibrary() {
    yield takeLatest('MODLIBRARY/GET', getModelLibrary)
}
function* watchModelLibraryOne() {
    yield takeLatest('MODLIBRARY/GET/ONE', getModelLibraryOne)
}
function* watchModelLibraryCreate() {
    yield takeLatest('MODLIBRARY/POST/CREATE', postModelLibraryCreate)
}
//启动配置
export default function* () {
    yield fork(watchModelLibrary);
    yield fork(watchModelLibraryOne);
    yield fork(watchModelLibraryCreate);
}
