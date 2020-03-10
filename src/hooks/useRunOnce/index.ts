import { useEffect, useState } from 'react'

const useRunOnce = (func: (params: any) => void, params?: any) => {
	const [firstTime, setFirstTime] = useState(true)
	useEffect(() => {
		if (firstTime) {
			setFirstTime(false)
			func(params)
		}
	}, [firstTime, func])
}

export default useRunOnce
