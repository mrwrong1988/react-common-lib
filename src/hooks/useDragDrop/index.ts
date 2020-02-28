import { useRef } from 'react'

// 拖拽时颜色 [激活颜色, 边框颜色, 字体颜色]
export const dragColors = ['#00a2d0', '#d9d9d9', '#b6b6b6']

// 判断是否拖拽到目标容器
export const findDropTarget = (target: HTMLElement, classNames: [string?] = []) => {
  let curNode = target as HTMLElement
  // 遍历praent
  while (curNode) {
    if (typeof curNode.className === 'string') {
      const nodeClassNames = curNode.className.split(' ')
      if (classNames.some((className = '') => nodeClassNames.includes(className))) {
        return curNode
      }
    }
    curNode = curNode.parentNode as HTMLElement
  }
  return null
}

/**
 * 父容器处理拖拽，
 * 被拖动元素需要传递的数据放到data-drag-content自定义属性里(复杂类型需JSON.stringify转为字符串)
 * 放下元素需要传递的数据放到data-drop-content自定义属性里(复杂类型需JSON.stringify转为字符串)
 * handleDrop中第二个参数callback可以定义放下回调处理，带上了拖动元素传递和放下元素的数据
 * @param targetClassNames 目标className名称s数组
 */
export const useDragDrop = (targetClassNames: [string]) => {
  const dragDataRef = useRef<any>(null)

  const dragDropEvents = {
    // 拖拽时阻止默认行为
    handleDragOver: (event: DragEvent) => {
      event.preventDefault()
    },
    // 开始拖动
    handleDragStart: (event: DragEvent) => {
      const target = event.target as HTMLElement
      dragDataRef.current = target.getAttribute('data-drag-content')
      target.className = 'on-drag'
    },
    // 拖动结束
    handleDragEnd: (event: DragEvent) => {
      (event.target as HTMLElement).className = ''
      dragDataRef.current = null
    },
    // 拖动离开或者进入时
    handleDragEnterOrLeave: (event: DragEvent, isEnter = true) => {
      const target = event.target as HTMLElement
      if (!target) {
        return
      }

      if (findDropTarget(target, targetClassNames)) {
        target.style.borderColor = dragColors[isEnter ? 0 : 1]
      }
    },
    // 拖拽放下时
    handleDrop: (event: DragEvent, callback: (dargData: string | null, dropData: string | null) => void) => {
      const target = event.target as HTMLElement
      if (!target) {
        return
      }
      const dropElement = findDropTarget(target, targetClassNames)
      if (dropElement) {
        const dropData = dropElement.getAttribute('data-drop-content')
        callback(dragDataRef.current, dropData)
      }
      // 设置拖拽样式
      dragDropEvents.handleDragEnterOrLeave(event, false)
    },
  }

  return dragDropEvents
}
