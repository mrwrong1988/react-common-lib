import { useState, useEffect, useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { message } from '@cyber-insight/cps-ui'
import { showLoadingBar, closeLoadingBar } from 'actions/Common'
import api from 'utils/api'

const toQueryString = parms => {
	return Object.entries(parms || {})
		.map(entity => `${entity[0]}=${entity[1]}`)
		.join('&')
}

const useQuery = ({
	path,
	params,
	headers,
	getData,
	manually = false,
	defaultValue = null,
	showError = true,
	showGlobalLoading = true,
} = {}) => {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState(defaultValue)
	const dispatch = useDispatch()
	const pathWithQuery = useMemo(() => {
		if (!params) {
			return path
		}
		return `${path}?${toQueryString(params)}`
	}, [params, path])

	const queryFunc = useCallback(
		async url => {
			try {
				setLoading(true)
				if (showGlobalLoading) {
					dispatch(showLoadingBar())
				}
				const res = await api.get(url, headers)
				const data = getData ? getData(res) : res
				setData(data)
				return data
			} catch (error) {
				if (showError) {
					message.error(error.message || '操作失败')
				}
				throw error
			} finally {
				setLoading(false)
				if (showGlobalLoading) {
					dispatch(closeLoadingBar())
				}
			}
		},
		[dispatch, getData, headers, showError, showGlobalLoading],
	)

	useEffect(() => {
		if (!manually) {
			queryFunc(pathWithQuery)
		}
	}, [manually, pathWithQuery, queryFunc])

	const reload = useCallback(
		(params, newPath = path) => {
			return queryFunc(
				params ? `${newPath}?${toQueryString(params)}` : newPath,
			)
		},
		[path, queryFunc],
	)

	return { loading, data, setData, reload }
}

export default useQuery
