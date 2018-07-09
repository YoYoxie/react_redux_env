import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Breadcrumb, Icon, Menu } from 'antd';
import Sidebar from './Sidebar';
import Submenu from './Submenu';
import {withRouter} from "react-router-dom";
import styles from './Layout.less';

const SubMenu = Menu.SubMenu;

// const Layout = ({ children, sidebar }) => {
//     const { mode } = sidebar;
//     return (
//         <div className={styles.layoutaside}>
//             <Sidebar />
//             <div className={mode == "inline"?styles.layoutmain:styles.layoutview}>
//                 <div className={styles.layoutheader}>
//                     <Submenu />
//                 </div>
//                 {children}
//             </div>
//         </div>
//     );
// };
class Layout extends React.Component {
    render () {
        let {mode} = this.props.sidebar;
        return (
            <div className={styles.layoutaside}>
                <Sidebar />
                <div className={mode == "inline"?styles.layoutmain:styles.layoutview}>
                    <div className={styles.layoutheader}>
                        <Submenu />
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.element.isRequired,
};
function mapStateToProps({ sidebar }) {
    return {
        sidebar: sidebar,
    };
}
export default withRouter(connect(mapStateToProps)(Layout));
