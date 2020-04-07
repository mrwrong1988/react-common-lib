import { createAction } from 'redux-actions'
import isEqual from 'lodash/isEqual'
import api from 'src/utils/api'
import resourceConfig from './resourceConfig'

export const resourceMangeAction = {
	loading: 'RESOURCE_MANAGE/pending',
	fulfilled: 'RESOURCE_MANAGE/fulfilled',
	rejected: 'RESOURCE_MANAGE/rejected',
	reset: 'RESOURCE_MANAGE/reset',
}

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

export const setLoading = createAction(
	resourceMangeAction.loading,
	key => ({key}),
)

export const setError = createAction(
	resourceMangeAction.rejected,
	(key, error) => ({key, error}),
)

export const resetResource = createAction(resourceMangeAction.reset, key => ({key, data: resourceConfig[key].initialData}))

export const loadResource = createAction(
	resourceMangeAction.fulfilled,
	(key, params, option) => async (dispatch, getState) => {
		// 使用缓存
		const currentResource = getState()[key] || {}
		if (currentResource.data && isEqual(params, currentResource.params) && !option.refresh) {
			return currentResource
		}

		const {path, getData, cumstomLoading, customError} = resourceConfig[key]
		const { finalPath, requestParams } = getPathAndParams(path, params)
		try {
			if (cumstomLoading) {
				dispatch(setLoading(key))
			}
			const res = await api.get(finalPath, requestParams)
			const data = getData ? getData(res) : res
			return { key, data, params }
		} catch (error) {
			if (customError) {
				dispatch(setError(key, error))
			} else {
				throw error
			}
		}
	},
	(key) => {
		const {cumstomLoading} = resourceConfig[key]
		return { noMask: cumstomLoading }
	},
)
