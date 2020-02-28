import { useCallback, useState } from 'react'
import {
  defaultPageSizeOptions,
  defaultGetFilters,
  defaultGetSorter,
} from './helper'

const useTable = ({
  pagination = true,
  getFilters = defaultGetFilters,
  getSorter = defaultGetSorter,
  directKey = 'direction',
} = {}) => {
  const [params, setParams] = useState({
    current: pagination ? 1 : undefined,
    pageSize: pagination ? Number(defaultPageSizeOptions[0]) : undefined,
  })

  const handleTableChange = useCallback(
    (paginationInfo, filters, sorter) => {
      setParams({
        current: pagination ? paginationInfo.current : undefined,
        pageSize: pagination ? paginationInfo.pageSize : undefined,
        ...getFilters(filters),
        ...getSorter(sorter, directKey),
      })
    },
    [directKey, getFilters, getSorter, pagination]
  )

  return { tableParams: params, handleTableChange }
}

export default useTable
