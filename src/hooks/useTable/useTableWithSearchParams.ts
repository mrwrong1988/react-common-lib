import { useCallback, useMemo } from 'react'
import { pick, omit } from 'lodash'
import useSearchParams from '../useSearchParams/index'
import {
  defaultPageSizeOptions,
  defaultGetFilters,
  defaultGetSorter,
} from './helper'

const useTableWithSearchParams = ({
  pagination = true,
  getFilters = defaultGetFilters,
  getSorter = defaultGetSorter,
  directKey = 'direction',
  excludeKeys = [],
} = {}) => {
  const { searchParams, replace } = useSearchParams()
  const tableParams = useMemo(() => {
    const params = omit(searchParams, excludeKeys)
    return {
      ...params,
      offset: pagination ? Number(searchParams.offset) || 1 : undefined,
      limit: pagination
        ? searchParams.limit || defaultPageSizeOptions[0]
        : undefined,
    }
  }, [excludeKeys, pagination, searchParams])

  const handleTableChange = useCallback(
    (paginationInfo, filters, sorter) => {
      const params = pick(searchParams, excludeKeys)
      replace({
        ...params,
        offset: pagination ? paginationInfo.current : undefined,
        limit: pagination ? paginationInfo.pageSize : undefined,
        ...getFilters(filters),
        ...getSorter(sorter, directKey),
      })
    },
    [
      directKey,
      excludeKeys,
      getFilters,
      getSorter,
      pagination,
      replace,
      searchParams,
    ]
  )

  return { tableParams, handleTableChange }
}

export default useTableWithSearchParams
