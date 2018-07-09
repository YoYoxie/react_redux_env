import { handleActions } from 'redux-actions';
/*
    车型库版本管理-列表详情-状态
*/
const verVersion = handleActions({
    ['VERVERSION/GET'](state,action) {
      return {...state, info:action.info,};
    },
    ['VERVERSION/GET/SUCCESS'](state, action) {
      return {...state, list: action.list, load: false, };
    },
    ['VERVERSION/GET/ONE'](state, action) {
      return {...state, formid: action.formid, };
    },
    ['VERVERSION/GET/ONE/SUCCESS'](state, action) {
      return {...state, formdata: action.formdata, };
    },
    ['VERVERSION/POST/CREATE'](state, action) {
      return {...state, formdata: action.formdata, };
    },
    ['VERVERSION/DELETE'](state, action) {
      return {...state, formid: action.formid, };
    },
    ['VERVERSION/SET/MODAL'](state, action) {
      return {...state, modal: action.modal, }
    },
    ['VERVERSION/SET/STATUS'](state, action) {
      return {...state, status: action.status, }
    },
    ['VERVERSION/SET/DATA'](state, action) {
      return {...state, formdata: action.formdata, }
    },
    ['VERVERSION/SET/LOAD'](state, action) {
      return {...state, load: action.load, };
    },
    ['VERVERSION/SET/LOADING'](state, action) {
      return {...state, loading: action.loading, };
    },
    ['VERVERSION/CLEAR'](state, action) {
      return {...state, formid: '', formdata: {}, };
    },
    ['VERVERSION/CLEAR/LIST'](state, action) {
      return {...state, list: {}, };
    },
    ['VERVERSION/CLEAR/DATA'](state, action) {
      return {...state, formdata: {}, };
    },
}, {
    list: {},
    info: {
        page:0,
        size:5,
    },
    modal: false,
    status: false,
    load: true,
    loading: false,
    patchinfo:'',
    formid: '',
    formdata: {},
    mydata: {},
    role: '',
});

export default verVersion;
