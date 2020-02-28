import { useEffect, MutableRefObject } from 'react'

export function useClickOutside(ref: MutableRefObject<any>, clickOutsideAction: (target: HTMLElement) => void) {
  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target)) {
      clickOutsideAction(event.target as HTMLElement)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })
}
