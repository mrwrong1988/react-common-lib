import { SYSTEM_REPORT_ERROR, SYSTEM_CLEAN_ERROR } from '../actions/systemError';
import createReducer from './createReducer';

const initialState = {
  type: null,
  message: null,
};

type StateType = typeof initialState;

const handlers = {
  [SYSTEM_REPORT_ERROR](state: StateType, { payload }: {payload: any}) {
    const { type, message } = payload;
    return {type, message}
  },

  [SYSTEM_CLEAN_ERROR]() {
    return initialState;
  }
};

export default createReducer(initialState, handlers);
