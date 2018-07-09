import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { history } from 'react-router';
import {withRouter} from "react-router-dom";
import { Spin, Table, Button, Row, Col, Icon, Form, Select, Input, Modal, Checkbox, Popconfirm} from 'antd';
import { conconfigget,conconfigmodal,conconfigloading } from '../../action/configure/Configure';
import { getQueryString } from '../utils';
import styles from '../style/card.less';
import Shape from '../image/Shape.png';
import UploadModel from '../upload/UploadModel';

const Option = Select.Option;
const Search = Input.Search;

class Configure extends React.Component {
    constructor (props) {
        super(props)
    }

    componentWillMount(){
        let { info } = this.props.conConfig;
        this.props.conconfigget(info);
    }
    // 筛选
    formFilter(key, value){
        let { info } = this.props.conConfig;
        if(key == 'levelId'){
            info.levelId = value;
        }
        if(key == 'enabled'){
            if(value){
                info.enabled = value == 'true'?true:false;
            }else{
                info.enabled = undefined;
            }
        }
        if(key == 'locked'){
            if(value){
                info.locked = value == 'true'?true:false;
            }else{
                info.locked = undefined;
            }
        }
        info.page=0;
        info.size=10;
        this.props.conconfigget(info);
    }
    //分页
    formPage(current, pageSize){
        const { info } = this.props.conConfig;
        info.page = current - 1;
        if(pageSize != info.size){
            info.size = pageSize;
            info.page = 0;
        }
        this.props.conconfigget(info);
    }
    //设置弹窗
    setModal(key, value){
        this.props.conconfigmodal(true);
    }
    //查看
    onLook(formid){
        this.props.history.push({
            pathname:"/vehmodlibrary/configure/moddetail",
            search:'?q=&id='+formid
        })
    }
    // 禁用启用确认
    confirmEnable(type,boolean,formid){
        if(type=='enabled'){
            if(boolean){
                // this.props.accountpatchone(formid,'enable');
            }else{
                // this.props.accountpatchone(formid,'disable');
            }
        }else if(type=='locked'){
            if(boolean){
                // this.props.accountpatchone(formid,'lock');
            }else{
                // this.props.accountpatchone(formid,'unlock');
            }
        }
    }
    render() {
        const { list, info, load, modal, loading } = this.props.conConfig;
        const pagination = {
            total: list.totalElements,
            current: info.page + 1,
            pageSize: info.size,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
            //每页条数改变
            onShowSizeChange: this.formPage.bind(this),
            //页码改变
            onChange: this.formPage.bind(this),
        };
        const columns = [
            { title: '第三方ID', align:'left',dataIndex: 'levelId', key: 'levelId',},
            { title: '厂商', align:'left', dataIndex: 'makerName', key: 'makerName',},
            { title: '品牌', align:'left', dataIndex: 'brandName', key: 'brandName',},
            { title: '车系', align:'left', dataIndex: 'seriesName', key: 'seriesName',},
            { title: '车型', align:'left', dataIndex: 'genreationYearModel', key: 'genreationYearModel',},
            { title: '年款', align:'left', dataIndex: 'genreationYear', key: 'genreationYear',},
            { title: '销售名称', align:'left', dataIndex: 'saleName', key: 'saleName',},
            { title: '状态', dataIndex: 'status', key: 'status',
                render: (text, record) => (<span>{record.status=='show'?'显示':'隐藏'}</span>),
            },
            // { title: '更新时间', dataIndex: 'time', key: 'e',
            //     render: (text, record) => (<span>{record.isLocked?'是':'否'}</span>),
            // },
            { title: '操作', key: 'operation',
                render: (text, record) => (<span>
                    <a onClick={this.onLook.bind(this, record.id)}>查看</a>
                </span>),
            },
        ];

        return (
            <div className={styles.card} id="area">
                <Row className={styles.gapunusual}>
                    {/*<Col span={3} className={styles.pr8}>
                        <Select style={{ width: '100%' }} allowClear placeholder='启用状态' onChange={this.formFilter.bind(this, 'enabled')} getPopupContainer={() => document.getElementById('area')} disabled={load}>
                            <Option value='true'>启用</Option>
                            <Option value='false'>禁用</Option>
                        </Select>
                    </Col>
                    <Col span={3} className={styles.pr8}>
                        <Select style={{ width: '100%' }} allowClear placeholder='锁定状态' onChange={this.formFilter.bind(this, 'locked')} getPopupContainer={() => document.getElementById('area')} disabled={load}>
                            <Option value='true'>锁定</Option>
                            <Option value='false'>解锁</Option>
                        </Select>
                    </Col>
                    <Col span={3} className={styles.pr8}>
                        <Search placeholder="levelId搜索" style={{width: '100%'}} disabled={load} onSearch={this.formFilter.bind(this, 'levelId')}/>
                    </Col>*/}
                    <Col style={{ float: "right"}}>
                        <Button size="large" onClick={this.setModal.bind(this)}><span className={styles.iconSelf} style={{backgroundImage: `url(${Shape})`}} />更新车型配置库</Button>
                    </Col>
                </Row>
                <Table rowKey="id" loading={load} columns={columns} dataSource={list.content} pagination={pagination} />
                <UploadModel
                    title = "更新车型配置库"
                    type="config" 
                    uploading={loading} 
                    modal = {modal} 
                    setModal={this.props.conconfigmodal.bind(this)} 
                    setUploading={this.props.conconfigloading.bind(this)}
                    reload = {this.props.conconfigget.bind(this)} />
            </div>
        )
    }
}

function mapStateToProps({ conConfig }) {
    return {
        conConfig: conConfig,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        conconfigget: bindActionCreators(conconfigget,dispatch),
        conconfigmodal: bindActionCreators(conconfigmodal,dispatch),
        conconfigloading: bindActionCreators(conconfigloading,dispatch),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Configure));
