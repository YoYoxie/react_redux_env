import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reqwest from 'reqwest';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import {withRouter} from "react-router-dom";
import { bindActionCreators } from 'redux';
import { Button, Row, Col, Form, notification, Modal, Upload } from 'antd';


class UploadModel extends React.Component {
        
    constructor (props) {
        super(props)
        this.state = {
            file: null,
        }
    }
    componentWillMount(){
       
    }
    componentDidUpdate(){
        
    }
    //表单提交
    formSubmit (visible) {
        let formData = new FormData();
        formData.append('file',this.state.file);
        formData.append('type',this.props.type)
        reqwest({
            url: 'http://vehicle-model-dev.aishuaiche.com/vehicle/excel/upload',
            method: 'post',
            processData: false,
            type:'json',
            headers:{
                authorization:cookie.get('authorization'),
            },
            data: formData,
            success: (resp) => {
                let info = {
                    page:0,
                    size:10
                }
                if(resp.ok){
                    this.props.reload(info)
                    this.setState({file: null});
                    this.props.setUploading(true);
                    notification['success']({
                        message: '上传成功',
                    })
                }else{
                    this.props.reload(info)
                    this.setState({file: null});
                    this.props.setUploading(true);
                    notification['error']({
                        message: resp.errorMsg,
                    })
                }
                    
            },
            error: (resp) => {
                this.setState({
                    uploading: false,
                });
                notification['error']({
                        message: '上传失败',
                })
            },
        });
        this.props.setModal(visible);
    }
    //设置弹窗
    setModal(){
        this.props.setModal(false);
    }
    render () {
        const { getFieldDecorator } = this.props.form;
        const { modal,uploading,title } = this.props;
        const props = {
            name: 'file',
            accept: '.xlsx,.xsl',
            action: 'http://vehicle-model-dev.aishuaiche.com/vehicle/excel/upload',
            data:(file) => {
                let filedata = {
                    file:file,
                    type:this.props.type,
                }
                return filedata;
            },
            headers: {
                CORS: '*',
                authorization:cookie.get('authorization'),
            },
            defaultFileList : [],
            onRemove: (file) => {
                this.setState({file:null})
                this.props.setUploading(true);
                return true;
            },
            beforeUpload: (file) => {
                this.setState({file:file})
                this.props.setUploading(false);
                return false;
            },
            onChange:() =>{
                console.log(1)
            }
        }
        return (
            <Modal title={title} 
                width={500} 
                visible={modal} 
                onOk={this.formSubmit.bind(this,false)} 
                okText = "上传"
                cancelText = "取消"
                footer={[
                    <Button key="back" onClick={this.setModal.bind(this)}>取消</Button>,
                    <Button key="submit" type="primary" disabled={uploading} onClick={this.formSubmit.bind(this,false)}>
                      上传
                    </Button>,
                  ]}
                onCancel={this.setModal.bind(this)}
                >
                <div>
                    <span style={{marginRight:"16px"}}>选择文件</span>
                    <Upload {...props} disabled={!uploading}>
                        <Button>选择文件</Button>
                    </Upload>
                </div>
            </Modal>
        )
    }
};

UploadModel = Form.create()(UploadModel);
UploadModel.propTypes = {
    type: PropTypes.string,
    setModal: PropTypes.func,
    setUploading: PropTypes.func,
    reload: PropTypes.func,
};

function mapStateToProps({ }) {
    return {
        
    };
}
function mapDispatchToProps(dispatch) {
    return {
       
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadModel));
