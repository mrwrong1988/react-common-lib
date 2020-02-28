export default (initialState: any, handlers: any) => {
  if (!initialState || !handlers) {
    throw new Error('must pass args of "initialState" and "handlers" to createReducer!');
  }

  return (state = initialState, action: any) => {
    if (action && action.type) {
      const type = action.type;

      if (!handlers[type]) {
        return state;
      }

      return handlers[type](state, action);
    }

    return state;
  };
};
