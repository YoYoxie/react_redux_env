import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import reducers from './reducers/index'
import sidebar from './reducers/sidebar'
import SagaManager from './sagas/SagaManager';
// import './config'
// import App from './App'
import App from './routes/index';
import './index.less';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

registerServiceWorker()
// action
function locationChange (location = '/') {
  return {
    type    : '@@router/LOCATION_CHANGE',
    payload : location
  }
}
const updateLocation = ({ dispatch }) => {
  	return (nextLocation) => dispatch(locationChange(nextLocation))
}
const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();
const initialState = history.location;
const enhancer = compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(combineReducers({
  ...reducers, routing,
}), initialState, enhancer);
store.unsubscribeHistory = history.listen(updateLocation(store))
SagaManager.startSagas(sagaMiddleware);


ReactDOM.render((
    <Provider store={store}>
    	<LocaleProvider locale={zhCN}>
        	<Router>
	            <App />
	        </Router>
      	</LocaleProvider>
    </Provider>
), document.getElementById('root'));