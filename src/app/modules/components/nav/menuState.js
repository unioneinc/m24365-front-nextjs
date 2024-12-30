import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { logger } from '~/lib/logger'
import * as SidebarIcons from './MainMenuIcons'
import { useRouter } from 'next/navigation'

const MenuContext = createContext()
const STORAGE_KEY = 'appState'

export const SaveInitialMenuState = () => {
  const initialState = {
    openItem: null,
    selectedItem: null,
    selectedSubItem: null,
    selectedMainItem: null,
    isExpanded: false,
    isChanged: false
  }
  try {
    const serializedState = JSON.stringify(initialState)
    localStorage.setItem(STORAGE_KEY, serializedState)
    logger.info('초기 메뉴 상태가 저장되었습니다.')
  } catch (error) {
    logger.error('초기 메뉴 상태 저장 중 오류 발생:', error)
  }
  return initialState // 초기 상태를 반환합니다.
}

export const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEY, serializedState)
  } catch (error) {
    logger.error('상태 저장 중 오류 발생:', error)
  }
}

export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY)
    if (serializedState === null) {
      return {
        openItem: null,
        selectedItem: null,
        selectedSubItem: null,
        selectedMainItem: null,
        isExpanded: false,
        isChanged: false
      }
    }
    return JSON.parse(serializedState)
  } catch (error) {
    logger.error('상태 불러오기 중 오류 발생:', error)
    return {
      openItem: null,
      selectedItem: null,
      selectedSubItem: null,
      selectedMainItem: null,
      isExpanded: false,
      isChanged: false
    }
  }
}

export const MenuProvider = ({ children }) => {
  // const [state, setState] = useState(loadStateFromLocalStorage);
  const [state, setState] = useState(() => loadStateFromLocalStorage())
  const contextValue = React.useMemo(() => ({ state, setState }), [state])

  useEffect(() => {
    saveStateToLocalStorage(state)
  }, [state])

  return <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
}

export const useMenuState = () => {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('useMenuState must be used within a MenuProvider')
  }

  const { state, setState } = context
  const router = useRouter()

  const toggleItem = useCallback(
    (index) => {
      setState((prevState) => ({
        ...prevState,
        openItem: prevState.openItem === index ? null : index,
        selectedItem: index,
        selectedSubItem: null,
        isExpanded: prevState.openItem !== index,
        selectedMainItem: index,
        isChanged: true
      }))
      if (index === 0) {
        router.push('/calendar')
      }
    },
    [setState, router]
  )

  const selectSubItem = useCallback(
    (itemIndex, subItemIndex) => {
      setState((prevState) => ({
        ...prevState,
        selectedItem: itemIndex,
        selectedSubItem: subItemIndex,
        isChanged: true
      }))
      if (itemIndex > 0) {
        handleSubMenuAction(sidebarList[itemIndex].tasks[subItemIndex], router)
      }
    },
    [setState, router]
  )

  const resetMenuState = useCallback(() => {
    setState({
      openItem: null,
      selectedItem: null,
      selectedSubItem: null,
      selectedMainItem: null,
      isExpanded: false,
      isChanged: false
    })
  }, [setState])

  useEffect(() => {
    if (state.isChanged) {
      setState((prevState) => ({
        ...prevState,
        isChanged: false
      }))
    }
  }, [state.isChanged, setState])

  return {
    menuState: state,
    toggleItem,
    selectSubItem,
    setMenuState: setState,
    resetMenuState
  }
}

export const StateLogger = () => {
  const { menuState } = useMenuState()

  useEffect(() => {
    // logger.info('selectedSubItem:', menuState.selectedSubItem);
    // logger.info('selectedMainItem:', menuState.selectedMainItem);
    logger.info(getTaskName(menuState.selectedMainItem, menuState.selectedSubItem))
  }, [menuState.selectedSubItem, menuState.selectedMainItem])

  return null // 이 컴포넌트는 UI를 렌더링하지 않습니다.
}

export const sidebarList = [
  {
    type: '간편등록',
    Icon: SidebarIcons.SimpleSubsciption,
    tasks: []
  },
  {
    type: '서비스관리',
    Icon: SidebarIcons.ServiceManagement,
    tasks: ['유지보수관리', '서비스요청', '유상서비스']
  },
  {
    type: '그룹관리',
    Icon: SidebarIcons.GroupManagement,
    tasks: ['그룹등록/조회', '그룹원조회']
  },
  {
    type: '자산관리',
    Icon: SidebarIcons.AssetManagement,
    tasks: ['자산등록/조회', '자산일괄등록/조회']
  },
  {
    type: '계약관리',
    Icon: SidebarIcons.ContractManagement,
    tasks: ['계약등록/조회', '정기점검 계약관리']
  },
  {
    type: '통계보고서',
    Icon: SidebarIcons.StatisticReport,
    tasks: [
      '서비스통계(리뉴얼)',
      '자산통계(리뉴얼)',
      '엔지니어통계(리뉴얼)',
      '보고서 관리(리뉴얼)',
      '그룹별 통계'
    ]
  },
  {
    type: '알림소식',
    Icon: SidebarIcons.NoticeNews,
    tasks: ['공지사항', '설문조사']
  },
  {
    type: '설정관리',
    Icon: SidebarIcons.ConfigManagement,
    tasks: ['템플릿 관리', '알림설정']
  },
  {
    type: '고객센터',
    Icon: SidebarIcons.CustomerCenter,
    tasks: ['1:1 문의사항', '자주하는 질문', '이용안내']
  },
  {
    type: '테스트',
    Icon: SidebarIcons.CustomerCenter,
    tasks: ['그룹리스트', '화면1', '화면2']
  }
]

/**
 * 주어진 인덱스에 해당하는 task 이름을 반환하는 함수
 * @param {number} index - sidebarList의 인덱스
 * @param {number} taskIndex - tasks 배열의 인덱스
 * @returns {string|null} - 찾은 task 이름 또는 null (찾지 못한 경우)
 */
export const getTaskName = (index, taskIndex) => {
  if (index < 0 || index >= sidebarList.length) {
    return null
  }

  const item = sidebarList[index]

  // taskIndex가 null인 경우 item.type 반환
  if (taskIndex === null) {
    return item.type
  }

  // taskIndex가 유효한 경우 해당 task 반환
  if (item.tasks && taskIndex >= 0 && taskIndex < item.tasks.length) {
    return item.tasks[taskIndex]
  }
  // 그 외의 경우 null 반환
  return null
}

/**
 * task 이름으로 해당 항목의 인덱스와 task 인덱스를 찾는 함수
 * @param {string} taskName - 찾고자 하는 task 이름
 * @returns {{index: number, taskIndex: number}|null} - 찾은 인덱스 또는 null (찾지 못한 경우)
 */
export const findTaskIndices = (taskName) => {
  for (let i = 0; i < sidebarList.length; i++) {
    const taskIndex = sidebarList[i].tasks.indexOf(taskName)
    if (taskIndex !== -1) {
      return { index: i, taskIndex }
    }
  }
  return null
}

// 사용 예시:
// const taskName = getTaskName(1, 2); // "유상서비스"
// const indices = findTaskIndices("유상서비스"); // { index: 1, taskIndex: 2 }

/**
 * 서브메뉴 클릭 시 라우팅 처리하는 함수
 */
export const handleSubMenuAction = (title, router) => {
  switch (title) {
    case '유지보수관리':
      router.push('/maintenance')
      break
    case '서비스요청':
      router.push('/serviceRequest')
      break
    // ... 나머지 라우팅 케이스들
    default:
      break
  }
}
