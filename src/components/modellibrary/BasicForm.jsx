import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import { Button, Modal, Form, Input, Select } from 'antd';
import { modbasiceditmodal,modbasicput,modbasicbrandget,modbasicseriesget,modbasicgenreationget } from '../../action/modellibrary/ModelBasic';


const FormItem = Form.Item;
const Option = Select.Option;

class BasicForm extends React.Component {
    constructor (props) {
        super(props)
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
            let {formdata} = this.props.modBasic;
            formdata.makerId = data.makerId;
            formdata.brandId = data.brandId;
            formdata.seriesId = data.seriesId;
            formdata.genreationYearId = data.genreationYearId;
            formdata.saleName = data.saleName;
            console.log(formdata)
            this.props.modbasicput(formdata);
            this.props.modbasiceditmodal(false)

        });
    }
    // 层级筛选
    onSearch(arg,value){
        let info = {
            page: 0,
            size:10000,
        }
    }
    //设置弹窗
    setModal(){
        this.props.form.resetFields();
        this.props.modbasiceditmodal(false)
        
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { list, editmodal, loading, formid, formdata, makerlist, brandlist, serieslist, genreationlist } = this.props.modBasic;

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };
        const makeroptions = [],brandoptions = [], seriesoptions = [], genreationoptions = [];
        const makerdata = makerlist?makerlist.content:[],
              branddata = brandlist?brandlist.content:[],
              seriesdata = serieslist?serieslist.content:[],
              genreationdata = genreationlist?genreationlist.content:[];
        for (let i in makerdata) {
            makeroptions.push(<Option key={makerdata[i].id} value={makerdata[i].id}>{makerdata[i].name}</Option>);
        }
        for (let i in branddata) {
            brandoptions.push(<Option key={branddata[i].id} value={branddata[i].id}>{branddata[i].name}</Option>);
        }
        for (let i in seriesdata) {
            seriesoptions.push(<Option key={seriesdata[i].id} value={seriesdata[i].id}>{seriesdata[i].name}</Option>);
        }
        for (let i in genreationdata) {
            genreationoptions.push(<Option key={genreationdata[i].id} value={genreationdata[i].id}>{genreationdata[i].model + ' ' + genreationdata[i].year}</Option>);
        }

        return (
            <Modal 
            title='编辑车型基础信息' 
            width={500} 
            confirmLoading={loading} 
            visible={editmodal} 
            okText = "确定"
            cancelText = "取消"
            onOk={this.formSubmit.bind(this)} 
            onCancel={this.setModal.bind(this)}>
                <Form layout='horizontal'>
                    <FormItem label="车型ID" {...formItemLayout}>
                        <div style={{marginTop:'5px'}}>{formid}</div>
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('id', { initialValue: formdata.id})(
                            <Input type="hidden" />
                        )}
                    </FormItem>
                    <FormItem label="第三方ID" {...formItemLayout}>
                        <div style={{marginTop:'5px'}}>{formdata.levelId}</div>
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('levelId', { initialValue: formdata.levelId})(
                            <Input type="hidden" />
                        )}
                    </FormItem>
                    <FormItem label="厂商" {...formItemLayout}>
                        {getFieldDecorator('makerId', { initialValue: formdata.makerId})(
                            <Select placeholder="请选择厂商" showSearch optionFilterProp="children"  onChange={this.onSearch.bind(this,'maker')}>
                                {makeroptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="品牌" {...formItemLayout}>
                        {getFieldDecorator('brandId', { initialValue: formdata.brandId})(
                            <Select placeholder="请选择品牌" showSearch optionFilterProp="children"  onChange={this.onSearch.bind(this,'brand')}>
                                {brandoptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="车系" {...formItemLayout}>
                        {getFieldDecorator('seriesId', { initialValue: formdata.seriesId})(
                            <Select placeholder="请选择车系" showSearch optionFilterProp="children"  onChange={this.onSearch.bind(this,'series')}>
                                {seriesoptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="车型年款" {...formItemLayout}>
                        {getFieldDecorator('genreationYearId', { initialValue: formdata.genreationYearId })(
                            <Select placeholder="请选择车型年款" optionFilterProp="children" showSearch>
                                {genreationoptions}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="销售名称" {...formItemLayout}>
                        {getFieldDecorator('saleName', { initialValue: formdata.saleName })(
                            <Input placeholder="请输入销售名称" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
BasicForm = Form.create()(BasicForm);

function mapStateToProps({ modBasic }) {
    return {
        modBasic: modBasic,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        modbasiceditmodal: bindActionCreators(modbasiceditmodal, dispatch),
        modbasicput: bindActionCreators(modbasicput,dispatch),
        modbasicbrandget: bindActionCreators(modbasicbrandget,dispatch),
        modbasicseriesget: bindActionCreators(modbasicseriesget,dispatch),
        modbasicgenreationget: bindActionCreators(modbasicgenreationget,dispatch),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BasicForm));
