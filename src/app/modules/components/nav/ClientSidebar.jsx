'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { MenuLogo, MenuNotice, MenuBottomLogo } from './ServerSidebar'
import ServerSidebar from './ServerSidebar'
import { sidebarList } from './menuState'
import { useRouter } from 'next/navigation'
//
import { useSidebarStore } from '@/stores/sidebarStore'
import { useAuthStore } from '@/stores/modules.zustand'
import { useStore } from '@/stores/storeZustand'

const baseStyles = {
  alignSelf: 'stretch',
  height: '40px',
  width: '240px',
  paddingLeft: '15px',
  paddingRight: '15px',
  paddingTop: '10px',
  paddingBottom: '10px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer'
}

export const MenuTitle = React.memo(
  ({ icon: Icon, title, isSelected, onClick, isExpanded, isSelectedMenu, menuIndex }) => {
    const [isHovered, setIsHovered] = useState(false)

    const colorStyles = useMemo(
      () => (isSelected ? { backgroundColor: 'white', color: 'black' } : { color: '#fcfcfc' }),
      [isSelected]
    )

    const hoverStyles = useMemo(
      () => (!isSelected && isHovered ? { backgroundColor: 'rgba(255, 255, 255, 0.2)' } : {}),
      [isSelected, isHovered]
    )

    return (
      <div
        style={{ ...baseStyles, ...colorStyles, ...hoverStyles }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <div
            style={{ width: '16px', height: '15.06px', position: 'relative', marginRight: '25px' }}
          >
            <Icon color={isSelected ? 'black' : 'white'} />
          </div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 'normal',
              fontFamily: "'Noto Sans KR', sans-serif",
              lineHeight: '14px',
              flexGrow: 1
            }}
            onFocus={(e) => e.target.blur()}
          >
            {title}
          </div>
        </div>

        {menuIndex > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '-2px' }}>
            {isSelectedMenu ? (
              <ChevronDown
                style={{ width: '16px', height: '16px' }}
                color={isSelected ? 'black' : 'white'}
              />
            ) : (
              <ChevronRight
                style={{ width: '16px', height: '16px' }}
                color={isSelected ? 'black' : 'white'}
              />
            )}
          </div>
        )}
      </div>
    )
  }
)

MenuTitle.displayName = 'MenuTitle'

export const SubMenuTitle = React.memo(({ title, isSelected, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  const containerStyle = useMemo(
    () => ({
      alignSelf: 'stretch',
      height: '40px',
      width: '240px',
      padding: '10px 15px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      backgroundColor: isSelected
        ? 'white'
        : isHovered
          ? 'rgba(255, 255, 255, 0.1)'
          : 'transparent',
      color: isSelected ? 'black' : '#fcfcfc',
      transition: 'background-color 0.3s ease'
    }),
    [isSelected, isHovered]
  )

  const innerContainerStyle = useMemo(
    () => ({
      display: 'flex',
      alignItems: 'center',
      gap: '25px',
      width: '100%'
    }),
    []
  )

  const dotContainerStyle = useMemo(
    () => ({
      width: '16px',
      height: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }),
    []
  )

  const dotStyle = useMemo(
    () => ({
      width: '4px',
      height: '4px',
      borderRadius: '50%',
      backgroundColor: isSelected ? 'black' : '#fcfcfc'
    }),
    [isSelected]
  )

  const textStyle = useMemo(
    () => ({
      fontSize: '14px',
      fontWeight: 'normal',
      fontFamily: 'Noto Sans KR',
      lineHeight: '14px'
    }),
    []
  )

  return (
    <div
      style={containerStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={innerContainerStyle}>
        <div style={dotContainerStyle}>
          <div style={dotStyle} />
        </div>
        <div style={textStyle}>{title}</div>
      </div>
    </div>
  )
})

SubMenuTitle.displayName = 'SubMenuTitle'

export const MainMenuView = React.memo(() => {
  const router = useRouter()

  const {
    openItem,
    selectedItem,
    selectedSubItem,
    selectedMainItem,
    _isExpanded,
    isChanged,
    setOpenItem,
    setSelectedItem,
    setSelectedSubItem,
    setSelectedMainItem,
    handleSubMenuAction
  } = useSidebarStore()

  const handleMainMenuClick = useCallback(
    (index) => {
      setOpenItem(openItem === index ? null : index)
      setSelectedItem(index)
      setSelectedSubItem(null)
      setSelectedMainItem(index)
      if (index === 0) {
        router.push('/calendar')
      }
    },
    [openItem, setOpenItem, setSelectedItem, setSelectedSubItem, setSelectedMainItem, router]
  )

  const handleSubItemClick = useCallback(
    (itemIndex, subItemIndex) => {
      setSelectedItem(itemIndex)
      setSelectedSubItem(subItemIndex)
      const task = sidebarList[itemIndex].tasks[subItemIndex]
      handleSubMenuAction(task, router)
    },
    [setSelectedItem, setSelectedSubItem, handleSubMenuAction, router]
  )

  const memoizedSidebarList = useMemo(() => sidebarList, [])

  return (
    <div
      style={{
        width: '280px',
        height: '100%',
        backgroundColor: '#0E174A',
        paddingLeft: '29px',
        paddingRight: '29px',
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '3px',
        cursor: 'default',
        userSelect: 'none',
        outline: 'none',
        overflow: 'auto'
      }}
    >
      {memoizedSidebarList.map((item, index) => (
        <MemoizedMenuItem
          key={index}
          item={item}
          index={index}
          openItem={openItem}
          selectedItem={selectedItem}
          selectedSubItem={selectedSubItem}
          selectedMainItem={selectedMainItem}
          _isExpanded={_isExpanded}
          isChanged={isChanged}
          handleMainMenuClick={handleMainMenuClick}
          selectSubItem={handleSubItemClick}
        />
      ))}
    </div>
  )
})

MainMenuView.displayName = 'MainMenuView'

const MemoizedMenuItem = React.memo(
  ({
    item,
    index,
    openItem,
    selectedItem,
    selectedSubItem,
    selectedMainItem,
    _isExpanded,
    isChanged,
    handleMainMenuClick,
    selectSubItem
  }) => {
    return (
      <div className="w-full">
        <MenuTitle
          icon={item.Icon}
          title={item.type}
          isSelected={selectedItem === index && selectedSubItem === null}
          isExpanded={_isExpanded && selectedMainItem === index}
          isSelectedMenu={selectedMainItem === index}
          menuIndex={index}
          onClick={() => handleMainMenuClick(index)}
        />
        {isChanged ? (
          <AnimatePresence>
            {openItem === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.1 }}
                className="mt-1 space-y-1"
              >
                {item.tasks.map((task, taskIndex) => (
                  <SubMenuTitle
                    key={taskIndex}
                    title={task}
                    isSelected={selectedItem === index && selectedSubItem === taskIndex}
                    onClick={() => selectSubItem(index, taskIndex)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          openItem === index && (
            <div className="mt-1 space-y-1">
              {item.tasks.map((task, taskIndex) => (
                <SubMenuTitle
                  key={taskIndex}
                  title={task}
                  isSelected={selectedItem === index && selectedSubItem === taskIndex}
                  onClick={() => selectSubItem(index, taskIndex)}
                />
              ))}
            </div>
          )
        )}
      </div>
    )
  }
)

MemoizedMenuItem.displayName = 'MemoizedMenuItem'

export const ClientSidebar = () => {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const { setOpenItem, setSelectedItem, setSelectedSubItem, setSelectedMainItem } =
    useSidebarStore()

  // 인증 상태 관리 - 필요한 상태만 선택적으로 가져오기
  const _myInfo = useStore((state) => state.myInfo)
  const _fetchMyInfo = useStore((state) => state.fetchMyInfo)
  const _myinfo = useAuthStore((state) => state.myinfo)
  const _getAuthentication = useAuthStore((state) => state.getAuthentication)

  useEffect(() => {
    setIsClient(true)
    if (window.location.pathname === '/') {
      // 초기 상태 설정
      setOpenItem(null)
      setSelectedItem(null)
      setSelectedSubItem(null)
      setSelectedMainItem(null)
    }
  }, [setOpenItem, setSelectedItem, setSelectedSubItem, setSelectedMainItem])

  const handleMenuLogoClick = () => {
    router.push('/')
  }

  return (
    <>
      {isClient ? (
        <>
          <MenuLogo onClick={handleMenuLogoClick} />
          <MenuNotice
          // userName={_myInfo.mbrNm}
          // profileFile={_myInfo.profileFile}
          // useCorpName={_myinfo.useCorpName}
          // userRequestWatingCount={_myinfo.userRequestWatingCount}
          // userAdmitWatingCount={_myinfo.userAdmitWatingCount
          />
          <MainMenuView />
          <MenuBottomLogo />
        </>
      ) : (
        <ServerSidebar />
      )}
    </>
  )
}

MemoizedMenuItem.displayName = 'MemoizedMenuItem'
// export default ClientSidebar
