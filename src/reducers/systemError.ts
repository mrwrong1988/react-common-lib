import { ActionType } from '../actions/systemError';
import createReducer from './createReducer';

const initialState = {
  type: null,
  message: null,
};

type StateType = typeof initialState;

const handlers = {
  [ActionType.report](state: StateType, { payload }: {payload: any}) {
    const { type, message } = payload;
    return {type, message}
  },

  [ActionType.clean]() {
    return initialState;
  }
};

export default createReducer(initialState, handlers);
