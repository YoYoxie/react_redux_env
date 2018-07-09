import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import cookie from 'js-cookie';
import { getMenuApp } from '../services/sidebar';
import { message, notification } from 'antd';

/*
 * 一个 saga 就是一个 Generator Function
 *
 * 每当 store.dispatch `LOGIN` action 的时候都会调用 loginPost.
 */

function* sidebarGet(action) {
    // try {
    //     const { jsonResult } = yield call(getMenuApp);
    //     if (jsonResult.ok) {
            yield put({
                type: 'SIDEBAR/GET/SUCCESS',
                list: [
                {
                    "categoryName":null,
                    "extParam":"/vehmodlibrary",
                    "iconUri":"dashboard",
                    "iconUri2":null,
                    "id":81,
                    "menuName":"车型库管理",
                    "menus":[
                        {
                            "categoryName":null,
                            "extParam":"/vehmodlibrary/modlibrary",
                            "iconUri":null,
                            "iconUri2":null,
                            "id":125,
                            "menuName":"车型完整库",
                            "menus":[

                            ],
                            "parentMenu":"车型库管理",
                            "parentMenuId":81
                        },
                        {
                            "categoryName":null,
                            "extParam":"/vehmodlibrary/modbasic",
                            "iconUri":null,
                            "iconUri2":null,
                            "id":128,
                            "menuName":"基础库管理",
                            "menus":[

                            ],
                            "parentMenu":"车型库管理",
                            "parentMenuId":81
                        },
                        {
                            "categoryName":null,
                            "extParam":"/vehmodlibrary/configure",
                            "iconUri":null,
                            "iconUri2":null,
                            "id":126,
                            "menuName":"配置库管理",
                            "menus":[

                            ],
                            "parentMenu":"车型库管理",
                            "parentMenuId":81
                        },
                        {
                            "categoryName":null,
                            "extParam":"/vehmodlibrary/versionlist",
                            "iconUri":null,
                            "iconUri2":null,
                            "id":127,
                            "menuName":"版本管理",
                            "menus":[

                            ],
                            "parentMenu":"车型库管理",
                            "parentMenuId":81
                        }
                    ],
                    "parentMenu":"顶级节点",
                    "parentMenuId":null
                }
                ]
            });
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
}

function* watchSidebar() {
    yield takeLatest('SIDEBAR/GET', sidebarGet)
}

export default function* () {
    yield fork(watchSidebar);
}
