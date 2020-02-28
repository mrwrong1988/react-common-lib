import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
// import { message } from 'antd'
// import { showLoadingBar, closeLoadingBar } from 'actions/common'
// import api from 'utils/api'

const useFetch = <T extends any>({
	getData = (value: T) => value,
	defaultValue = null,
	showError = true,
	showGlobalLoading = true,
} = {}) => {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState(defaultValue)
	const dispatch = useDispatch()

	const fetchFunc = useCallback(
		async ({ method = 'get', path, params }) => {
			try {
				setLoading(true)
				if (showGlobalLoading) {
					// dispatch(showLoadingBar())
				}
        // const res = await api[method](path, params)
        const res = 'result' as any
				const data = getData ? getData(res) : res
				setData(data)
				return data
			} catch (error) {
				if (showError) {
					// message.error(error.message || '操作失败')
				}
			} finally {
				setLoading(false)
				if (showGlobalLoading) {
					// dispatch(closeLoadingBar())
				}
			}
		},
		[dispatch, getData, showError, showGlobalLoading],
	)

	return { loading, data, fetchFunc, setData }
}

export default useFetch
