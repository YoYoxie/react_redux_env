import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu, Breadcrumb, Icon, Switch, Button } from 'antd';
import { sidebarget, sidebarmode, sidebaropen } from '../action/sidebar';
import { Link } from 'react-router-dom';
import styles from './Sidebar.less';
import {withRouter} from "react-router-dom";
import logo from './image/logo.png';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Sidebar extends React.Component {
    constructor (props) {
        super(props)
    }
    componentWillMount(){
        this.props.sidebarget();
    }

    //设置状态
    setMode(mode){
        console.log(mode);
        mode = mode == "inline"?'vertical':'inline',
        this.props.sidebarmode(mode);
        this.props.sidebaropen([]);
    }
    //设置展开
    setOpen(openkey){
        const { open } = this.props.sidebar;
        let openKey = openkey;
        const latestOpenKey = openkey.find(key => !(open.indexOf(key) > -1));
        if(latestOpenKey){
            openKey = [latestOpenKey];
        }
        this.props.sidebaropen(openKey);
    }

    render () {
        const { mode, list, open } = this.props.sidebar;

        //menu
        let menuView = [];
        if(list[0]){
            for(let i in list){
                if(list[i].menus[0]){
                    let menuChild = [];
                    for(let t in list[i].menus){
                        menuChild.push(<Menu.Item key={i+t}><Link test={list[i].menus[t].menuName} to={list[i].menus[t].extParam}>{list[i].menus[t].menuName}</Link></Menu.Item>);
                    }
                    menuView.push(<SubMenu key={i} title={<span><Icon type={list[i].iconUri} /><span test={list[i].menuName}>{list[i].menuName}</span></span>}>{menuChild}</SubMenu>);
                }
            }
        }

        return (
            <div className={mode == "inline"?styles.layoutsider:styles.layoutsiderview}>
            {mode == "inline"?
                <div className={styles.layoutlogo}>
                    <a onClick={this.setMode.bind(this, mode)}>
                        <span className={styles.logoSelf} style={{backgroundImage: `url(${logo})`}} />
                        <span test='name'>机动车信息管理系统</span>
                        {/*<span className={styles.logoSelf} style={{backgroundImage: `url(${logo})`}} />*/}
                    </a>
                </div>:
                <div className={styles.layoutlogo}>
                    <a onClick={this.setMode.bind(this, mode)}>
                        <span className={styles.logoSelf} style={{backgroundImage: `url(${logo})`}} />
                        {/*<span test='name'>机动车信息管理系统</span>*/}
                        {/*<span className={styles.logoSelf} style={{backgroundImage: `url(${logo})`}} />*/}
                    </a>
                </div>
            }
                <div className={styles.layoutmenu}>
                    <Menu id="menu" mode={mode} openKeys={open} onOpenChange={this.setOpen.bind(this)}>
                        {menuView}
                    </Menu>
                </div>
            </div>
        );
    }
};

function mapStateToProps({ sidebar }) {
    return {
        sidebar: sidebar,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sidebarget: bindActionCreators(sidebarget, dispatch),
        sidebarmode: bindActionCreators(sidebarmode, dispatch),
        sidebaropen: bindActionCreators(sidebaropen, dispatch),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
