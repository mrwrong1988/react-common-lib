import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { message } from '@cyber-insight/cps-ui'
import { showLoadingBar, closeLoadingBar } from 'actions/Common'
import api from 'utils/api'

const useMutation = ({
	path,
	showError = true,
	showGlobalLoading = true,
} = {}) => {
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()

	const mutationFunc = useCallback(
		async (params, newPath = path, method = 'post', headers = {}) => {
			try {
				setLoading(true)
				if (showGlobalLoading) {
					dispatch(showLoadingBar())
				}
				const res = await api[method](newPath, params, headers)
				return res
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
		[dispatch, path, showError, showGlobalLoading],
	)

	return { loading, mutationFunc }
}

export default useMutation
