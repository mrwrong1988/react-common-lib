import { handleActions } from 'redux-actions'
import { resourceMangeAction } from './actions'
import { initialState } from './resourceConfig'

const resources = handleActions(
	{
		[resourceMangeAction.loading]: (state, { payload: { key } }) => {
			return {
				...state,
				[key]: {...state[key], loading: true},
			}
		},
		[resourceMangeAction.fulfilled]: (state, { payload: { key, data, params } }) => {
			return {
				...state,
				[key]: {
					data,
					params,
					loading: false,
					error: null,
				},
			}
		},

		[resourceMangeAction.rejected]: (state, { payload: {key, error} }) => {
			return {
				...state,
				[key]: {
					...state[key],
					loading: false,
					error,
				},
			}
		},
		[resourceMangeAction.reset]: (state, { payload: { key, data } }) => {
			return {
				...state,
				[key]: {
					data,
					params: null,
					loading: false,
					error: null,
				},
			}
		},
	},
	initialState,
)

export default resources
