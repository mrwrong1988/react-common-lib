import { ActionType } from '../actions/systemLoading';
import createReducer from './createReducer';

const initialState = {
  display: false,
  text: ''
};

type StateType = typeof initialState;

const handlers = {
  [ActionType.show](state: StateType, { payload = { text: '' } }) {
    const { text } = payload;
    return {display: true, text};
  },

  [ActionType.hide]() {
    return {display: false, text: ''};
  }
};

export default createReducer(initialState, handlers);
