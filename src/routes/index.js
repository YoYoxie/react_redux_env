import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Link, Switch,withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import moment from 'moment-timezone/moment-timezone';
import 'moment/locale/zh-cn';


import styles from '../components/Layout.less';
import { getCookie } from '../components/utils';
import Login from '../components/Login';
import Layout from '../components/Layout';

// 车型库
import ModelLibrary from '../components/modellibrary/Modellibrary';
import ModelDetail from '../components/modellibrary/ModelDetail';
// 车型基础库
import ModelBasic from '../components/modellibrary/ModelBasic';
// 车型配置库
import Configure from '../components/configure/Configure';
// 车型版本库
import Version from '../components/version/Version';

moment.locale('zh-cn');
moment.tz.add('Asia/Shanghai|CST CDT|-80 -90|01010101010101010|-1c1I0 LX0 16p0 1jz0 1Myp0 Rb0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0|23e6');
moment.tz.setDefault('Asia/Shanghai');

const validate = function(next, replace, callback) {
    const isLoggedIn = !!getCookie('authorization')
    if (!isLoggedIn && next.location.pathname != '/login') {
        replace('/login')
    }
    callback()
}

const Home = props => {
    if(props.location.pathname!='/login'){
        let Child;
        switch (props.location.pathname) {
            case '/vehmodlibrary/modlibrary': Child = <ModelLibrary />; break;
            case '/vehmodlibrary/modlibrary/moddetail': Child = <ModelDetail />; break;
            case '/vehmodlibrary/modbasic': Child = <ModelBasic />; break;
            case '/vehmodlibrary/configure': Child = <Configure />; break;
            case '/vehmodlibrary/configure/moddetail': Child = <ModelDetail />; break;
            case '/vehmodlibrary/versionlist': Child = <Version />; break;
            default:      Child = <ModelLibrary />;
        }
        const breadcrumbNameMap = {
            // '/': '车型库管理系统',
            '/vehmodlibrary': '车型库管理',
            '/vehmodlibrary/modlibrary': '车型完整库',
            '/vehmodlibrary/modlibrary/moddetail': '车型详情',
            '/vehmodlibrary/modbasic': '基础库管理',
            '/vehmodlibrary/configure': '配置库管理',
            '/vehmodlibrary/configure/moddetail': '车型详情',
            '/vehmodlibrary/versionlist': '版本管理',
        };
        const { location } = props;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {breadcrumbNameMap[url]}
                    </Link>
                </Breadcrumb.Item>
            );
        });
        const breadcrumbItems = [(
            <Breadcrumb.Item key="home">
              <Link to="/">机动车信息管理系统</Link>
            </Breadcrumb.Item>
          )].concat(extraBreadcrumbItems);
        return(
        <Layout>
            <div className={styles.layoutcontainer}>
                <div className={styles.layoutbreadcrumb}>
                    <Breadcrumb>
                        {breadcrumbItems}
                    </Breadcrumb>
                </div>
                <div className={styles.layoutcontent}>
                    {Child}
                </div>
            </div>
        </Layout>)
    }else{
        return <Login />
    }
        
}

class App extends React.Component {
    render () {
        return (
            <div style={{height:'100%'}}>
                <Switch>
                    <Route path="/" component={Home} onEnter = { validate }/>
                    
                </Switch>
            </div>
        )
    }
}

export default withRouter(App);
