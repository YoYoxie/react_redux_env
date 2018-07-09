import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Button, Row, Col, Select, Input, Modal, Icon} from 'antd';
import { modbasicget,modbasicmodal,modbasicuploading,modbasiceditmodal,modbasicgetone,modbasicmakerget,modbasicbrandget,modbasicseriesget,modbasicgenreationget } from '../../action/modellibrary/ModelBasic';
import { getQueryString } from '../utils';
import {withRouter} from "react-router-dom";
import UploadModel from '../upload/UploadModel';
import BasicForm from './BasicForm';
import Shape from '../image/Shape.png';
import styles from '../style/card.less';

const Option = Select.Option;
const Search = Input.Search;

class ModelBasic extends React.Component {
    constructor (props) {
        super(props)
    }

    componentWillMount(){
        let { info,makerinfo,brandinfo,seriesinfo,genreationinfo } = this.props.modBasic;
        this.props.modbasicget(info);
        this.props.modbasicmakerget(makerinfo);
        this.props.modbasicbrandget(brandinfo);
        this.props.modbasicseriesget(seriesinfo);
        this.props.modbasicgenreationget(genreationinfo);
    }
    // 筛选
    formFilter(key, value){
        let { info } = this.props.modBasic;
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
        this.props.modbasicget(info);
    }
    //分页
    formPage(current, pageSize){
        const { info } = this.props.modBasic;
        info.page = current - 1;
        if(pageSize != info.size){
            info.size = pageSize;
            info.page = 0;
        }
        this.props.modbasicget(info);
    }
    //设置上传弹窗
    setModal(key, value){
        this.props.modbasicmodal(true);
    }
    //设置编辑弹窗
    setEditModal(id){
        this.props.modbasicgetone(id);
        this.props.modbasiceditmodal(true);
    }
    render() {
        const { list, info, load, modal, uploading } = this.props.modBasic;
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
                    <a onClick={this.setEditModal.bind(this, record.id)}>编辑</a>
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
                        <Search defaultValue={getQueryString('username')} placeholder="手机号搜索" style={{width: '100%'}} disabled={load} onSearch={this.formFilter.bind(this, 'username')}/>
                    </Col>*/}
                    <Col span={3} className={styles.pr8}>
                        <Search test='levelId' placeholder="levelId搜索" style={{width: '100%'}} disabled={load} onSearch={this.formFilter.bind(this, 'levelId')}/>
                    </Col>
                    <Col style={{ float: "right"}}>
                        <Button size="large" onClick={this.setModal.bind(this)}><span className={styles.iconSelf} style={{backgroundImage: `url(${Shape})`}} />更新车型基础库</Button>
                    </Col>
                </Row>
                <Table rowKey="id" loading={load} columns={columns} dataSource={list.content} pagination={pagination} />
                <UploadModel
                    title = "更新车型基础库"
                    type="basic" 
                    uploading={uploading} 
                    modal = {modal} 
                    setModal={this.props.modbasicmodal.bind(this)} 
                    setUploading={this.props.modbasicuploading.bind(this)}
                    reload = {this.props.modbasicget.bind(this)} />
                <BasicForm />    
            </div>
        )
    }
}

function mapStateToProps({ modBasic }) {
    return {
        modBasic: modBasic,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        modbasicget: bindActionCreators(modbasicget,dispatch),
        modbasicmodal: bindActionCreators(modbasicmodal,dispatch),
        modbasicuploading:bindActionCreators(modbasicuploading,dispatch),
        modbasiceditmodal: bindActionCreators(modbasiceditmodal,dispatch),
        modbasicgetone:bindActionCreators(modbasicgetone,dispatch),
        modbasicmakerget:bindActionCreators(modbasicmakerget,dispatch),
        modbasicbrandget:bindActionCreators(modbasicbrandget,dispatch),
        modbasicseriesget:bindActionCreators(modbasicseriesget,dispatch),
        modbasicgenreationget:bindActionCreators(modbasicgenreationget,dispatch),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModelBasic));