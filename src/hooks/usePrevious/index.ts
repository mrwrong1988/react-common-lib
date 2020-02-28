import { useRef, useEffect } from 'react'

/**
 * 保存当前执行传入值，并在下一次执行时返回
 * @param value 需要保存得值，对象类型
 * @returns 上一次执行得值
 */
const usePrevious = (value: any) => {
  const ref = useRef<any>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export default usePrevious
