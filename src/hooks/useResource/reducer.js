import { handleActions } from 'redux-actions'
import { UPDATE_RESOURCE, SET_RESOURCE, RESET_RESOURCE } from './actions'
import { initialState } from './resourceConfig'

const resources = handleActions(
	{
		[UPDATE_RESOURCE]: (state, { payload: { key, newProps } }) => {
			return {
				...state,
				[key]: {
					...state[key],
					...newProps,
				},
			}
		},
		[SET_RESOURCE]: (state, { payload: { key, resource } }) => {
			return {
				...state,
				[key]: resource,
			}
		},
		[RESET_RESOURCE]: (state, { payload: key }) => {
			return {
				...state,
				[key]: initialState[key],
			}
		},
	},
	initialState,
)

export default resources
