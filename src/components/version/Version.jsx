import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import { Spin, Table, Button, Row, Col, Form, Select, Input, Modal, Checkbox, Popconfirm} from 'antd';
import { verversionget,verversiongetone,verversiondelete } from '../../action/version/Version';
import moment from 'moment';
import { getQueryString } from '../utils';
import styles from '../style/card.less';

const Option = Select.Option;
const Search = Input.Search;

class Version extends React.Component {
    constructor (props) {
        super(props)
    }

    componentWillMount(){
        let { info } = this.props.verVersion;
        this.props.verversionget(info);
    }
    // 筛选
    formFilter(key, type, value, arg){
        let { info } = this.props.verVersion;
        if(key == 'versionNo'){
            if(type=='enter'){
                if(value.target.value){
                    info.versionNo = value.target.value;
                }else{
                    delete info.versionNo;
                }
            }else{
                if(value){
                    info.versionNo = value;
                }else{
                    delete info.versionNo;
                }
            }
                
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
        this.props.verversionget(info);
        // this.props.accountload(true);
    }
    //分页
    formPage(current, pageSize){
        const { info } = this.props.verVersion;
        info.page = current - 1;
        if(pageSize != info.size){
            info.size = pageSize;
            info.page = 0;
        }
        this.props.verversionget(info);
        // this.props.accountload(true);
    }
    // 激活
    active(id){
        this.props.verversiongetone(id)
    }
    // 删除
    delete(id){
        this.props.verversiondelete(id)
    }
    render() {
        const { list, info, load } = this.props.verVersion;
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
            { title: '版本号', align:'left',dataIndex: 'name', key: 'name',},
            { title: '状态', align:'left',dataIndex: 'version', key: 'status',
                render: (text, record) => (<span>{record.status=='active'?'激活':record.status=='inactive'?'未激活':record.status=='processing'?'发布中':'发布失败'}</span>),
            },
            { title: '生成时间', align:'left',dataIndex: 'creationTime', key: 'creationTime',
                render: (text, record) => record.creationTime?moment(record.creationTime).format("YYYY-MM-DD"):'',
            },
            { title: '发布时间', align:'left',dataIndex: 'modificationTime', key: 'modificationTime',
                render: (text, record) => record.modificationTime?moment(record.modificationTime).format("YYYY-MM-DD"):'',
            },
            { title: '操作', key: 'operation',
                render: (text, record) => (<span>
                    {record.status=='active'?'':record.status=='inactive'?
                    <Popconfirm title="确认激活此版本？"
                    placement="left"
                    okText="激活" 
                    cancelText="取消"
                    onConfirm={this.active.bind(this,record.id)}>
                        <a>激活</a>
                    </Popconfirm>
                    :
                    <Popconfirm title="确认删除此版本？"
                    placement="left"
                    okText="删除" 
                    cancelText="取消"
                    onConfirm={this.delete.bind(this,record.id)}>
                        <a>删除</a>
                    </Popconfirm>}
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
                    </Col>*/}
                    <Col span={4} className={styles.pr8}>
                        <Search defaultValue={info.versionNo} test='versionNo' placeholder="版本号搜索" style={{width: '100%'}} disabled={load} onPressEnter={this.formFilter.bind(this, 'versionNo','enter')} onSearch={this.formFilter.bind(this, 'versionNo','noenter')}/>
                    </Col>
                </Row>
                <Table rowKey="id" loading={load} columns={columns} dataSource={list.content} pagination={false} />
            </div>
        )
    }
}

function mapStateToProps({ verVersion }) {
    return {
        verVersion: verVersion,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        verversionget: bindActionCreators(verversionget,dispatch),
        verversiongetone: bindActionCreators(verversiongetone,dispatch),
        verversiondelete: bindActionCreators(verversiondelete,dispatch),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Version));

