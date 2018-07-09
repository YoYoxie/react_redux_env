import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, Input, Select, Card, Table, Carousel } from 'antd';
import styles from '../style/card.less';
import {withRouter} from "react-router-dom";

const FormItem = Form.Item;
const Option = Select.Option;

class ConfigCard extends React.Component {    
    constructor (props) {
        super(props)
        this.state = {
            editstatus: false,
        }
    }
        
    componentWillMount(){
        
    }
    componentDidUpdate(){
    }

    //增加表单
    formSubmit(){
        this.props.form.validateFields((errors, data) => {
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            

        });
    }
    edit(record,boolean){
        let { data, dataName } = this.props;
        let index=this.props.data.indexOf(record);
        this.props.changeStatus(dataName,data,index,boolean);
    }
    save(record,boolean){
        let { data, dataName } = this.props;
        let index=this.props.data.indexOf(record);
        this.props.changeStatus(dataName,data,index,boolean);
        this.props.form.validateFields((errors, datas) => {
            if (errors) {
                console.log('Errors in form!!!');
                return;
            }
            for(let i in datas){
                if(datas[i]){
                    record[i] = datas[i];
                }
            }
            this.props.saveData(record);
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { title, data, dataName, name, describe, border, deleteable, editable, nameEdit } = this.props;
        const pagination = {
            total: data.length,
            size:'small',
            // current: info.page + 1,
            pageSize: 5,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
            //每页条数改变
            // onShowSizeChange: this.formPage.bind(this),
            // //页码改变
            // onChange: this.formPage.bind(this),
        };
        const columns = [
            { title: name, dataIndex: 'time', key: 'configName',
                render: (text, record) => (nameEdit?!record.editthis.props.nameEdit?
                    <span>{record.configName}</span>:
                    <FormItem>
                        {getFieldDecorator('configName', { initialValue: record.configName })(
                            <Input size="small" placeholder={"请输入"+name} />
                        )}
                    </FormItem>:
                    <span>{record.configName}</span>
                ),
            },
            { title: describe, dataIndex: 'time', key: 'configValue',
                render: (text, record) => (!record.edit||!editable?
                    <span>{record.configValue?record.configValue:'--'}</span>:
                    <FormItem>
                        {getFieldDecorator('configValue', { initialValue: record.configValue })(
                            <Input size="small" placeholder={"请输入"+describe} />
                        )}
                    </FormItem>
                ),
            },
            { title: '操作', key: 'operation',
                render: (text, record) => (<span>
                    {!record.edit?editable?<a onClick={this.edit.bind(this,record,true)}>编辑</a>:'':<a onClick={this.save.bind(this,record,false)}>保存</a>}
                    {deleteable?<span style={{color:'#000 9%'}}>|</span>:record.edit?<span style={{color:'#000 9%'}}>|</span>:''}
                    {deleteable?<a onClick={this.edit.bind(this)}>删除</a>:record.edit?<a onClick={this.edit.bind(this,record,false)}>取消</a>:''}
                </span>),
            },
        ];
        return (
            <Card title={title} bordered={border}>
                <div style={{margin:'24px 0px'}}>
                    
                </div>
                <div style={{margin:'24px 12px 6px 12px'}}>
                    <Form layout='horizontal'>
                        <Table rowKey={record => dataName + record.configCode + record.configName } className={styles.cardTable} columns={columns} dataSource={data} pagination={pagination} />
                    </Form>    
                </div>
            </Card>
        )
    }
}
ConfigCard = Form.create()(ConfigCard);
ConfigCard.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    name: PropTypes.string,
    describe: PropTypes.string,
    changeStatus: PropTypes.func,
    saveData: PropTypes.func,
    deleteData: PropTypes.func,
};

function mapStateToProps({  }) {
    return {
        
    };
}
function mapDispatchToProps(dispatch) {
    return {
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfigCard));
