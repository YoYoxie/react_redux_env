reducers说明

状态变更：
    NAME/GET get请求
    NAME/POST post请求
    NAME/PUT put请求
    NAME/PATCH patch请求
    NAME/DELETE delete请求
    NAME/SET 设置
    NAME/CLEAR 清除

状态管理：
    list: {}, 列表数据
    listall: undefined, 所有列表数据
    info: {}, 请求信息
    modal: false, 弹窗
    status: false, 请求状态
    load: true, 表格加载状态
    loading: false, 表单提交状态
    formid: '', 表单请求id
    forminfo: {}, 通过驳回请求信息
    formdata: {}, 表单请求体
