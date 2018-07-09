import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';

const sidebar = handleActions({
  ['SIDEBAR/GET'](state) {
    return { ...state, };
  },
  ['SIDEBAR/GET/SUCCESS'](state, action) {
    return { ...state, list: action.list, };
  },
  ['SIDEBAR/MODE'](state, action) {
    return { ...state, mode: action.mode, };
  },
  ['SIDEBAR/OPEN'](state, action) {
    return { ...state, open: action.open, };
  },
}, {
  mode: 'inline',
  list: {},
  open: [],
});

export default sidebar;
