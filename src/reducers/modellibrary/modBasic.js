import { handleActions } from 'redux-actions';
/*
    车型库管理-列表详情-状态
*/
const modBasic = handleActions({
    ['MODBASIC/GET'](state,action) {
      return {...state, info:action.info,};
    },
    ['MODBASIC/GET/SUCCESS'](state, action) {
      return {...state, list: action.list, load: false, };
    },
    ['MODBASIC/GET/MAKER'](state,action) {
      return {...state, makerinfo:action.makerinfo,};
    },
    ['MODBASIC/GET/MAKER/SUCCESS'](state, action) {
      return {...state, makerlist: action.makerlist, load: false, };
    },
    ['MODBASIC/GET/BRAND'](state,action) {
      return {...state, brandinfo:action.brandinfo,};
    },
    ['MODBASIC/GET/BRAND/SUCCESS'](state, action) {
      return {...state, brandlist: action.brandlist, load: false, };
    },
    ['MODBASIC/GET/SERIES'](state,action) {
      return {...state, seriesinfo:action.seriesinfo,};
    },
    ['MODBASIC/GET/SERIES/SUCCESS'](state, action) {
      return {...state, serieslist: action.serieslist, load: false, };
    },
    ['MODBASIC/GET/GENREATION'](state,action) {
      return {...state, genreationinfo:action.genreationinfo,};
    },
    ['MODBASIC/GET/GENREATION/SUCCESS'](state, action) {
      return {...state, genreationlist: action.genreationlist, load: false, };
    },
    ['MODBASIC/GET/ONE'](state, action) {
      return {...state, formid: action.formid, };
    },
    ['MODBASIC/GET/ONE/SUCCESS'](state, action) {
      return {...state, formdata: action.formdata, };
    },
    ['MODBASIC/POST/CREATE'](state, action) {
      return {...state, filedata: action.filedata, };
    },
    ['MODBASIC/SET/MODAL'](state, action) {
      return {...state, modal: action.modal, }
    },
    ['MODBASIC/SET/EDITMODAL'](state, action) {
      return {...state, editmodal: action.editmodal, }
    },
    ['MODBASIC/SET/STATUS'](state, action) {
      return {...state, status: action.status, }
    },
    ['MODBASIC/SET/DATA'](state, action) {
      return {...state, formdata: action.formdata, }
    },
    ['MODBASIC/SET/LOAD'](state, action) {
      return {...state, load: action.load, };
    },
    ['MODBASIC/SET/LOADING'](state, action) {
      return {...state, loading: action.loading, };
    },
    ['MODBASIC/CLEAR'](state, action) {
      return {...state, formid: '', formdata: {}, };
    },
    ['MODBASIC/CLEAR/LIST'](state, action) {
      return {...state, list: {}, };
    },
    ['MODBASIC/CLEAR/DATA'](state, action) {
      return {...state, formdata: {}, };
    },
    ['MODBASIC/SET/UPLOADING'](state, action) {
      return {...state, uploading: action.uploading, };
    },
    ['MODBASIC/PUT/UPDATE'](state, action) {
      return {...state, formdata: action.formdata, };
    },
}, {
    list: {},
    makerlist: {},
    brandlist: {},
    serieslist: {},
    genreationlist: {},
    info: {
        page:0,
        size:10,
    },
    makerinfo: {
        page:0,
        size:10000,
    },
    brandinfo: {
        page:0,
        size:10000,
    },
    seriesinfo: {
        page:0,
        size:10000,
    },
    genreationinfo: {
        page:0,
        size:10000,
    },
    modal: false,
    editmodal: false,
    status: false,
    load: true,
    loading: false,
    patchinfo:'',
    formid: '',
    formdata: {},
    filedata:null,
    mydata: {},
    role: '',
    uploading:true,
});

export default modBasic;
