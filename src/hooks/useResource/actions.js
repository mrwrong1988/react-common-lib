import { createAction } from 'redux-actions'
import api from 'src/utils/api'
import resourceConfig from './resourceConfig'

export const SET_RESOURCE = 'SET_RESOURCE'
export const UPDATE_RESOURCE = 'UPDATE_RESOURCE'
export const RESET_RESOURCE = 'RESET_RESOURCE'

export const getPathAndParams = (path, params = {}) => {
	const requestParams = { ...params }
  const pathKeys = path.split('/')
	pathKeys.forEach((key, index) => {
		if (key.startsWith(':')) {
      const pathParamKey = key.slice(':')
			delete requestParams[pathParamKey]
			pathKeys[index] = params[pathParamKey]
		}
	})
	return { path: pathKeys.join('/'), requestParams }
}

export const updateResource = createAction(
	UPDATE_RESOURCE,
	({ key, newProps }) => ({ key, newProps }),
)

export const setResource = createAction(SET_RESOURCE, (key, props) => ({
	key,
	props,
}))

export const resetResource = createAction(RESET_RESOURCE, key => key)

export const fetchResource = createAction(
	UPDATE_RESOURCE,
	(key, params, option = {}) => async dispatch => {
    const { path, requestParams } = getPathAndParams(
      resourceConfig[key].path,
      params,
    )
		try {
      const {getData} = resourceConfig[key]
			dispatch(updateResource({ key, newProps: option.clear ? { loading: true, data: undefined } : { loading: true } }))
			const res = await api.get(path, requestParams)
			const data = getData ? getData(res) : res
			return {
        key,
				newProps: {
					data,
					loading: false,
					error: null,
					params: JSON.stringify(params),
				},
			}
		} catch (error) {
			dispatch(
				updateResource({ key, newProps: { loading: false, error } }),
			)
			throw error
		}
	},
	(key, params, option = {}) => ({ noMask: option.hideGlobalLoading }),
)
