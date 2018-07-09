import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Button, Row, Col, Card } from 'antd';
import moment from 'moment';
import {withRouter} from "react-router-dom";
import { modlibrarygetone } from '../../action/modellibrary/Modellibrary';
import { conconfigupdate } from '../../action/configure/Configure'
import { getQueryString } from '../utils';
import styles from '../style/page.less';

import ConfigCard from './ConfigCard';

class ModelDetail extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            status:true,
            spot: [],
            performance: [],
            basicConfig: [],
            eleSystem: [],
            interior: [],
            exterior: [],
        }
    }
    componentWillMount(){
        this.props.modlibrarygetone(getQueryString("id"));
        this.setState({status:true});
    }
    componentDidMount(){
    }
    componentWillUpdate(nextProps, nextState){
        let {formdata} = nextProps.modLibrary;
        let b = (JSON.stringify(formdata) == "{}");
        if(!b){
            if(this.state.status){
                this.setState({spot:this.setEdit(formdata.亮点配置)});
                this.setState({performance:this.setEdit(formdata.性能参数)});
                this.setState({basicConfig:this.setEdit(formdata.基础配置)});
                this.setState({eleSystem:this.setEdit(formdata.电气系统)});
                this.setState({interior:this.setEdit(formdata.车辆内饰)});
                this.setState({exterior:this.setEdit(formdata.车辆外观)});
                this.setState({status:false});
            }
        }
    }
    // 初始化编辑状态
    setEdit(data){
        let newdata=[];
        for(let i in data){
            let item = data[i];
            item.edit = false;
            newdata.push(item);
        }
        return newdata;
    }
    // 更改编辑状态
    changeStatus(name,data,index,boolean){
        data[index].edit = boolean;
        this.setState(this.state[name]:data)
    }
    save(data){
        this.props.conconfigupdate(data);
    }
    render() {
        const { formdata } = this.props.modLibrary;
        let {basicConfig,spot,performance,eleSystem,interior,exterior} = this.state;
        return (
            <div className={styles.page} id="area">
                <div className={styles.content}>
                    <Row gutter={24}>
                        <Col span={24}>
                            <Card title="车型库详情" bordered={false}>
                                <div className={styles.para}>
                                    <dl>
                                        <dt>车型ID：</dt>
                                        <em>{formdata.基础信息?formdata.基础信息.id:''}</em>
                                        <dt>创建时间：</dt>
                                        <em>{formdata.基础信息?moment(formdata.基础信息.creationTime).format("YYYY-MM-DD HH:mm:ss"):''}</em>
                                        <dt>创建人：</dt>
                                        <em>{formdata.基础信息?formdata.基础信息.createdByUser:''}</em>
                                    </dl>
                                    <dl>
                                        <dt>第三方ID：</dt>
                                        <em>{formdata.基础信息?formdata.基础信息.levelId:''}</em>
                                        <dt>更新时间：</dt>
                                        <em>{formdata.基础信息?moment(formdata.基础信息.modificationTime).format("YYYY-MM-DD HH:mm:ss"):''}</em>
                                        <dt>更新人：</dt>
                                        <em>{formdata.基础信息?formdata.基础信息.modifiedByUser:''}</em>
                                    </dl>
                                </div> 
                                <div className={styles.title}>
                                    基础信息
                                </div>
                                <div className={styles.para}>
                                    <dl>
                                        <dt>厂商：</dt>
                                        <em>{formdata.基础信息?formdata.基础信息.makerName:''}</em>
                                        <dt>车系：</dt>
                                        <em>{formdata.基础信息?formdata.基础信息.seriesName:''}</em>
                                        <dt>年款：</dt>
                                        <em>{formdata.基础信息?formdata.基础信息.genreationYear:''}</em>
                                    </dl>
                                    <dl>
                                        <dt>品牌：</dt>
                                        <em>{formdata.基础信息?formdata.基础信息.brandName:''}</em>
                                        <dt>车型：</dt>
                                        <em>{formdata.基础信息?formdata.基础信息.modelName:''}</em>
                                        <dt>销售名称：</dt>
                                        <em>{formdata.基础信息?formdata.基础信息.saleName:''}</em>
                                    </dl>
                                </div> 
                            </Card>
                        </Col>
                        <Col span={12} style={{margin:'24px 0px'}}>
                            <ConfigCard 
                                data = {spot}
                                dataName = 'spot'
                                title = '亮点配置'
                                name = '亮点名称'
                                describe = '亮点描述'
                                border = {false}
                                nameEdit = {false}
                                deleteable = {false}
                                editable = {true}
                                changeStatus = {this.changeStatus.bind(this)}
                                saveData = {this.save.bind(this)}
                            />
                        </Col>
                        <Col span={12} span={12} style={{margin:'24px 0px'}}>
                            <ConfigCard 
                                data = {basicConfig}
                                dataName = 'basicConfig'
                                title = '基础配置'
                                name = '基础配置名称'
                                describe = '基础配置描述'
                                border = {false}
                                nameEdit = {false}
                                deleteable = {false}
                                editable = {false}
                                changeStatus = {this.changeStatus.bind(this)}
                                saveData = {this.save.bind(this)}
                            />
                        </Col>
                        <Col span={12} span={12} style={{margin:'24px 0px'}}>
                            <ConfigCard 
                                data = {performance}
                                dataName = 'performance'
                                title = '性能配置'
                                name = '性能名称'
                                describe = '性能描述'
                                border = {false}
                                nameEdit = {false}
                                deleteable = {false}
                                editable = {true}
                                changeStatus = {this.changeStatus.bind(this)}
                                saveData = {this.save.bind(this)}
                            />
                        </Col>
                        <Col span={12} span={12} style={{margin:'24px 0px'}}>
                            <ConfigCard 
                                data = {eleSystem}
                                dataName = 'eleSystem'
                                title = '电气功能'
                                name = '电气功能名称'
                                describe = '电气功能描述'
                                border = {false}
                                nameEdit = {false}
                                deleteable = {false}
                                editable = {true}
                                changeStatus = {this.changeStatus.bind(this)}
                                saveData = {this.save.bind(this)}
                            />
                        </Col>
                        <Col span={12} span={12} style={{margin:'24px 0px'}}>
                            <ConfigCard 
                                data = {interior}
                                dataName = 'interior'
                                title = '车型内饰'
                                name = '内饰名称'
                                describe = '内饰描述'
                                border = {false}
                                nameEdit = {false}
                                deleteable = {false}
                                editable = {true}
                                changeStatus = {this.changeStatus.bind(this)}
                                saveData = {this.save.bind(this)}
                            />
                        </Col>
                        <Col span={12} span={12} style={{margin:'24px 0px'}}>
                            <ConfigCard 
                                data = {exterior}
                                dataName = 'exterior'
                                title = '外观配置'
                                name = '外观名称'
                                describe = '外观描述'
                                border = {false}
                                nameEdit = {false}
                                deleteable = {false}
                                editable = {true}
                                changeStatus = {this.changeStatus.bind(this)}
                                saveData = {this.save.bind(this)}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ modLibrary }) {
    return {
        modLibrary:modLibrary,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        modlibrarygetone:bindActionCreators(modlibrarygetone,dispatch),
        conconfigupdate:bindActionCreators(conconfigupdate,dispatch),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModelDetail));

