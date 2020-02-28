import { useCallback, useMemo } from 'react'
import { useLocation, useHistory } from 'react-router'
import * as queryString from 'query-string'

/**
 * 更方便的设置和使用URLSearchParams
 */
const useSearchParams = () => {
  const location = useLocation()
  const history = useHistory()

  const searchParams = useMemo(
    () => queryString.parse(location.search),
    [location.search]
  )

  const pushCallback = useCallback(
    (searchParams = {}) => {
      const search = queryString.stringify(searchParams)
      history.push(`${location.pathname}?${search}`, location.state)
    },
    [location, history]
  )

  const replaceCallback = useCallback(
    (searchParams = {}) => {
      const search = queryString.stringify(searchParams)
      history.replace(`${location.pathname}?${search}`, location.state)
    },
    [location, history]
  )

  return { searchParams, push: pushCallback, replace: replaceCallback }
}

export default useSearchParams
