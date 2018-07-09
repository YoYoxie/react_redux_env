import { handleActions } from 'redux-actions';
/*
    车型库管理-列表详情-状态
*/
const conConfig = handleActions({
    ['CONCONFIG/GET'](state,action) {
      return {...state, info:action.info,};
    },
    ['CONCONFIG/GET/SUCCESS'](state, action) {
      return {...state, list: action.list, load: false, };
    },
    ['CONCONFIG/GET/ONE'](state, action) {
      return {...state, formid: action.formid,formdata:{}, };
    },
    ['CONCONFIG/GET/ONE/SUCCESS'](state, action) {
      return {...state, formdata: action.formdata, };
    },
    ['CONCONFIG/POST/CREATE'](state, action) {
      return {...state, formdata: action.formdata, };
    },
    ['CONCONFIG/PUT/UPDATE'](state, action) {
      return {...state, formdata: action.formdata, };
    },
    ['CONCONFIG/SET/MODAL'](state, action) {
      return {...state, modal: action.modal, }
    },
    ['CONCONFIG/SET/STATUS'](state, action) {
      return {...state, status: action.status, }
    },
    ['CONCONFIG/SET/DATA'](state, action) {
      return {...state, formdata: action.formdata, }
    },
    ['CONCONFIG/SET/LOAD'](state, action) {
      return {...state, load: action.load, };
    },
    ['CONCONFIG/SET/LOADING'](state, action) {
      return {...state, loading: action.loading, };
    },
    ['CONCONFIG/CLEAR'](state, action) {
      return {...state, formid: '', formdata: {}, };
    },
    ['CONCONFIG/CLEAR/LIST'](state, action) {
      return {...state, list: {}, };
    },
    ['CONCONFIG/CLEAR/DATA'](state, action) {
      return {...state, formdata: {}, };
    },
}, {
    list: {},
    info: {
        page:0,
        size:10,
    },
    modal: false,
    status: false,
    load: true,
    loading: true,
    patchinfo:'',
    formid: '',
    formdata: {},
    mydata: {},
    role: '',
});

export default conConfig;
