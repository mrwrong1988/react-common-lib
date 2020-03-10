import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { systemShowLoading, systemHideLoading, systemReportError } from '../../actions'
import {api, MethodsType} from '../../fetchHelper'



const useFetch = <T extends any>({
	getData = (value: T) => value,
	defaultValue = undefined,
	showError = true,
	showGlobalLoading = true,
} = {}) => {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState(defaultValue)
	const dispatch = useDispatch()

	const fetchFunc = useCallback(
		async ({ method = 'get', path, params }: {method: MethodsType, path: string, params: any}) => {
			try {
				setLoading(true)
				if (showGlobalLoading) {
					dispatch(systemShowLoading())
				}

        const res = await api[method](path, params)
				const data = getData ? getData(res) : res
				setData(data)
				return data
			} catch (error) {
				if (showError) {
					// message.error(error.message || '操作失败')
					dispatch(systemReportError(error))
				}
			} finally {
				setLoading(false)
				if (showGlobalLoading) {
					dispatch(systemHideLoading())
				}
			}
		},
		[dispatch, getData, showError, showGlobalLoading],
	)

	return { loading, data, fetchFunc, setData }
}

export default useFetch
