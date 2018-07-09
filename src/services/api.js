const DEV = 'http://vehicle-model-dev.aishuaiche.com';
const QA = 'http://vehicle-model-dev.aishuaiche.com';
const PROD = 'http://vehicle-model-dev.aishuaiche.com';
const Mock = 'http://easymock.aishuaiche.com/mock/5b235e4883aa3e00217b97d0/example';

let URL = DEV;
const API = {
    //登录
    LOGIN: URL + '/user/login',
    LOGOUT: URL + '/passport/logout',
    FORGET: URL + '/forget_password',
    //部门'
    DEPARTMENT_LIST: URL + '/groups',
    // 人员
    PERSON_LIST: URL + '/people',
    /*账号管理列表*/
    USER: URL + '/user',
    USERS_LIST: URL + '/users/',
    USERS_BUSINESS: URL + '/business_users',
    /*车型库列表*/
    VEHICLE: URL + '/vehicle',
    /*版本列表*/
    VERSION_LIST: URL + '/vehicleVersion',
    /*车型基础库列表*/
    VEHICLE: URL + '/vehicle',
    UPLOAD: URL + '/vehicle/excel/upload',
    /*厂商*/
    MAKER: URL + '/vehicle/maker',
    /*品牌*/
    BRAND: URL + '/vehicle/brand',
    /*车系*/
    SERIES: URL + '/vehicle/series',
    /*车型年款*/
    GENREATION: URL + '/vehicle/genreation/year/model',
    /*配置*/
    CONFIG: URL + '/vehicle/model/config',
    }
export default API;  