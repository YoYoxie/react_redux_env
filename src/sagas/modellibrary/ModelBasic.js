import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import cookie from 'js-cookie';
import { getModelBasicList,postModelBasic,getModelBasicListOne,getModelBasicMakerList,getModelBasicBrandList,getModelBasicSeriesList,getModelBasicGenreationList,putModelBasic } from '../../services/modellibrary/ModelBasic';
import { message,notification } from 'antd';
/*
    组织架构-账号请求
*/
// 列表
function* getModelBasic(action) {
    try {
        const { jsonResult } = yield call(getModelBasicList,action.info);
        if (jsonResult.ok) {
            yield put({
                type: 'MODBASIC/GET/SUCCESS',
                list: jsonResult.data
            });
        }
    } catch (error) {
        console.log("getModelBasic err");
        console.log(error);
        yield put({
            type: 'MODBASIC/CLEAR/LIST',
        });
        notification['error']({
            message: '页面异常',
        })
    }
}
// 列表
function* getModelBasicMaker(action) {
    try {
        const { jsonResult } = yield call(getModelBasicMakerList,action.makerinfo);
        if (jsonResult.ok) {
            yield put({
                type: 'MODBASIC/GET/MAKER/SUCCESS',
                makerlist: jsonResult.data
            });
        }
    } catch (error) {
        console.log("getModelBasicMaker err");
        console.log(error);
        yield put({
            type: 'MODBASIC/CLEAR/LIST',
        });
        notification['error']({
            message: '页面异常',
        })
    }
}
// 列表
function* getModelBasicBrand(action) {
    try {
        const { jsonResult } = yield call(getModelBasicBrandList,action.brandinfo);
        if (jsonResult.ok) {
            yield put({
                type: 'MODBASIC/GET/BRAND/SUCCESS',
                brandlist: jsonResult.data
            });
        }
    } catch (error) {
        console.log("getModelBasicBrand err");
        console.log(error);
        yield put({
            type: 'MODBASIC/CLEAR/LIST',
        });
        notification['error']({
            message: '页面异常',
        })
    }
}
// 列表
function* getModelBasicSeries(action) {
    try {
        const { jsonResult } = yield call(getModelBasicSeriesList,action.seriesinfo);
        if (jsonResult.ok) {
            yield put({
                type: 'MODBASIC/GET/SERIES/SUCCESS',
                serieslist: jsonResult.data
            });
        }
    } catch (error) {
        console.log("getModelBasicSeries err");
        console.log(error);
        yield put({
            type: 'MODBASIC/CLEAR/LIST',
        });
        notification['error']({
            message: '页面异常',
        })
    }
}
// 列表
function* getModelBasicGenreation(action) {
    try {
        const { jsonResult } = yield call(getModelBasicGenreationList,action.genreationinfo);
        if (jsonResult.ok) {
            yield put({
                type: 'MODBASIC/GET/GENREATION/SUCCESS',
                genreationlist: jsonResult.data
            });
        }
    } catch (error) {
        console.log("getModelBasicGenreation err");
        console.log(error);
        yield put({
            type: 'MODBASIC/CLEAR/LIST',
        });
        notification['error']({
            message: '页面异常',
        })
    }
}
// 获得单个
function* getModelBasicOne(action) {
    try {
        const { jsonResult } = yield call(getModelBasicListOne, action.formid);
        if (jsonResult.ok) {
            yield put({
                type: 'MODBASIC/GET/ONE/SUCCESS',
                formdata: jsonResult.data,
            });
        }
    } catch (error) {
        console.log("getModelBasicOne err");
        message.error(error);
    }
}
// 创建
function* postModelBasicCreate(action) {
    try {
        const { jsonResult } = yield call(postModelBasic, action.filedata)
        if (jsonResult.ok) {
            yield put({
                type: 'MODBASIC/SET/STATUS',
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
                type: 'MODBASIC/SET/LOADING',
                loading: false
            });
        }
    }catch (error) {
        console.log("postModelBasicCreate err");
        message.error(error);
    }
}
// 编辑
function* putModelBasicUpdate(action) {
    try {
        const { jsonResult } = yield call(putModelBasic, action.formdata)
        if (jsonResult.ok) {
            yield put({
                type: 'MODBASIC/SET/STATUS',
                status: true
            });
            yield put({
                type: 'MODBASIC/GET',
                info: {
                    page:0,
                    size:10
                },
            });
            notification['success']({
                message: '编辑成功'
            })
        }else{
            notification['error']({
                message: jsonResult.errorCode,
                description: jsonResult.errorMsg
            });
            yield put({
                type: 'MODBASIC/SET/LOADING',
                loading: false
            });
        }
    } catch (error) {
        console.log("putModelBasicUpdate err");
        message.error(error);
    }
}

//事件监听

function* watchModelBasic() {
    yield takeLatest('MODBASIC/GET', getModelBasic)
}
function* watchModelBasicMaker() {
    yield takeLatest('MODBASIC/GET/MAKER', getModelBasicMaker)
}
function* watchModelBasicBrand() {
    yield takeLatest('MODBASIC/GET/BRAND', getModelBasicBrand)
}
function* watchModelBasicSeries() {
    yield takeLatest('MODBASIC/GET/SERIES', getModelBasicSeries)
}
function* watchModelBasicGenreation() {
    yield takeLatest('MODBASIC/GET/GENREATION', getModelBasicGenreation)
}
function* watchModelBasicOne() {
    yield takeLatest('MODBASIC/GET/ONE', getModelBasicOne)
}
function* watchModelBasicCreate() {
    yield takeLatest('MODBASIC/POST/CREATE', postModelBasicCreate)
}
function* watchModelBasicUpdate() {
    yield takeLatest('MODBASIC/PUT/UPDATE', putModelBasicUpdate)
}
//启动配置
export default function* () {
    yield fork(watchModelBasic);
    yield fork(watchModelBasicMaker);
    yield fork(watchModelBasicBrand);
    yield fork(watchModelBasicSeries);
    yield fork(watchModelBasicGenreation);
    yield fork(watchModelBasicOne);
    yield fork(watchModelBasicCreate);
    yield fork(watchModelBasicUpdate);
}
