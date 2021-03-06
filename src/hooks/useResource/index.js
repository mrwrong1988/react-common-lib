import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from './actions'

/**
 *
 * @param {*} key 资源ID
 * @param {*} autoFetch 是否自动load资源
 * @param {*} params 请求参数
 * @param {*} refresh 是否重新请求
 */
const useResource = (key, autoFetch = true, { params, option } = {}) => {
	const dispatch = useDispatch()
	const resource = useSelector(state => state.resources[key])

	const loadResource = useCallback(
		(params, option = {}) => {
			dispatch(actions.loadResource(key, params, option))
		},
		[dispatch, key],
	)

	const setResource = useCallback(
		data => {
			dispatch(actions.setResource(key, data))
		},
		[dispatch, key],
	)

	useEffect(() => {
		if (autoFetch) {
			loadResource(params, option)
		}
	}, [autoFetch, loadResource, params, option])

	return { resource: resource, loadResource, setResource }
}

export const useLocalResource = key => {
	const dispatch = useDispatch()
	const resource = useSelector(state => state.resources[key])

	const setResource = useCallback(
		data => {
			dispatch(actions.setResource(key, data))
		},
		[dispatch, key],
	)

	return { resource, setResource }
}

export default useResource
