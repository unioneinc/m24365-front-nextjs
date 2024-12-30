'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
// import { sidebarList } from './menuState'

const STORAGE_KEY = 'sidebarState'

export const useSidebar = () => {
  const [state, setState] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem(STORAGE_KEY)
      return savedState
        ? JSON.parse(savedState)
        : {
            openItem: null,
            selectedItem: null,
            selectedSubItem: null,
            isExpanded: false
          }
    }
    return {
      openItem: null,
      selectedItem: null,
      selectedSubItem: null,
      isExpanded: false
    }
  })

  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  }, [state])

  const toggleItem = useCallback(
    (index) => {
      setState((prevState) => ({
        ...prevState,
        openItem: prevState.openItem === index ? null : index,
        selectedItem: index,
        selectedSubItem: null,
        isExpanded: prevState.openItem !== index
      }))

      if (index === 0) {
        router.push('/calendar')
      }
    },
    [router]
  )

  const selectSubItem = useCallback((itemIndex, subItemIndex) => {
    setState((prevState) => ({
      ...prevState,
      selectedItem: itemIndex,
      selectedSubItem: subItemIndex
    }))

    // if (itemIndex > 0) {
    //   const task = sidebarList[itemIndex].tasks[subItemIndex]
    //   handleSubMenuAction(task, router)
    // }
  }, []) // selectSubItem 함수 닫기 추가

  const resetMenuState = useCallback(() => {
    setState({
      openItem: null,
      selectedItem: null,
      selectedSubItem: null,
      isExpanded: false
    })
  }, [])

  return {
    sidebarState: state,
    toggleItem,
    selectSubItem,
    resetMenuState
  }
}
