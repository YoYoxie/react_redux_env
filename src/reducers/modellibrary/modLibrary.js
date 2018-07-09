import { handleActions } from 'redux-actions';
/*
    车型库管理-列表详情-状态
*/
const modLibrary = handleActions({
    ['MODLIBRARY/GET'](state,action) {
      return {...state, info:action.info,};
    },
    ['MODLIBRARY/GET/SUCCESS'](state, action) {
      return {...state, list: action.list, load: false, };
    },
    ['MODLIBRARY/GET/ONE'](state, action) {
      return {...state, formid: action.formid,formdata:{}, };
    },
    ['MODLIBRARY/GET/ONE/SUCCESS'](state, action) {
      return {...state, formdata: action.formdata, };
    },
    ['MODLIBRARY/POST/CREATE'](state, action) {
      return {...state, filedata: action.filedata, };
    },
    ['MODLIBRARY/SET/MODAL'](state, action) {
      return {...state, modal: action.modal, }
    },
    ['MODLIBRARY/SET/STATUS'](state, action) {
      return {...state, status: action.status, }
    },
    ['MODLIBRARY/SET/DATA'](state, action) {
      return {...state, formdata: action.formdata, }
    },
    ['MODLIBRARY/SET/LOAD'](state, action) {
      return {...state, load: action.load, };
    },
    ['MODLIBRARY/SET/LOADING'](state, action) {
      return {...state, loading: action.loading, };
    },
    ['MODLIBRARY/CLEAR'](state, action) {
      return {...state, formid: '', formdata: {}, };
    },
    ['MODLIBRARY/CLEAR/LIST'](state, action) {
      return {...state, list: {}, };
    },
    ['MODLIBRARY/CLEAR/DATA'](state, action) {
      return {...state, formdata: {}, };
    },
    ['MODLIBRARY/SET/UPLOADING'](state, action) {
      return {...state, uploading: action.uploading, };
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
    loading: false,
    patchinfo:'',
    formid: '',
    formdata: {},
    filedata:null,
    uploading:true,
});

export default modLibrary;
