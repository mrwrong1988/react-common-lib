import { SYSTEM_SHOW_LOADING, SYSTEM_HIDE_LOADING } from '../actions/systemLoading';
import createReducer from './createReducer';

const initialState = {
  display: false,
  text: ''
};

type StateType = typeof initialState;

const handlers = {
  [SYSTEM_SHOW_LOADING](state: StateType, { payload = { text: '' } }) {
    const { text } = payload;
    return {display: true, text};
  },

  [SYSTEM_HIDE_LOADING]() {
    return {display: false, text: ''};
  }
};

export default createReducer(initialState, handlers);
