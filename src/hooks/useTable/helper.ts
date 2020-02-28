export const showTotal = (total: number) => `共${total}条`

export const defaultPageSizeOptions = ['10', '20', '30', '50']

export interface IFilters {
  [key: string]: [string?];
}

export interface ISorter {
  order: 'descend' | 'ascend';
  field: string;
  columnKey: string;
}

export const defaultGetFilters = (filters: IFilters) => {
  if (!filters) {
    return null
  }
  return Object.keys(filters).reduce(
    (params, field) => ({ ...params, [field]: filters[field].join(',') }),
    {}
  )
}

export const defaultGetSorter = (sorter: ISorter, directKey: string) => {
  if (!sorter || !sorter.field) {
    return null
  }
  return {
    orderBy: sorter.field,
    [directKey]: sorter.order === 'descend' ? 'desc' : 'asc',
  }
}
