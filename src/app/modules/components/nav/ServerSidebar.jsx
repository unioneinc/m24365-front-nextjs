import Image from 'next/image'
import { ChevronDown, ChevronRight } from 'lucide-react'
import * as SidebarIcons from './MainMenuIcons'

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

export const MenuLogo = ({ onClick }) => {
  return (
    <div
      className="menu-logo"
      onClick={onClick}
      style={{
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        width: '100%',
        height: '100px',
        backgroundColor: '#0E174A',
        padding: '1rem',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ maxWidth: '180px', margin: '0 auto' }}>
        <Image
          src="/images/layout/sidebar_m24365.png"
          alt="Sidebar Logo"
          width={180}
          height={63}
          priority
        />
      </div>
    </div>
  )
}

export const MenuNotice = ({
  isOpen,
  onClose,
  profileFile,
  userName,
  useCorpName,
  userRequestWatingCount,
  userAdmitWatingCount
}) => {
  return (
    <div
      style={{
        width: '100%',
        padding: '16px',
        backgroundColor: '#0E174A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          width: '100%',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxSizing: 'border-box'
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              position: 'relative',
              boxSizing: 'border-box'
            }}
          >
            {profileFile ? (
              <Image
                src={profileFile.fiPt}
                alt={profileFile.fiNm || '프로필 이미지'}
                width={48}
                height={48}
                unoptimized
              />
            ) : (
              <Image
                src="/images/nav/icon_user.png"
                alt="기본 프로필"
                width={48}
                height={48}
                priority={false}
              />
            )}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box'
            }}
          >
            <div
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#424242'
              }}
            >
              {userName}님
            </div>
            <div
              style={{
                fontSize: '14px',
                color: '#424242'
              }}
            >
              {useCorpName}
            </div>
          </div>
        </div>
        <div
          style={{
            width: '100%',
            padding: '8px',
            backgroundColor: 'white',
            borderRadius: '4px',
            border: '1px solid #DCDCDC',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxSizing: 'border-box'
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#424242'
            }}
          >
            나의 서비스 요청대기 {userRequestWatingCount}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: '#424242'
            }}
          >
            0000
          </div>
        </div>
        <div
          style={{
            width: '100%',
            padding: '8px',
            backgroundColor: 'white',
            borderRadius: '4px',
            border: '1px solid #DCDCDC',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxSizing: 'border-box'
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#424242'
            }}
          >
            나의 서비스 승인대기 {userAdmitWatingCount}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: '#424242'
            }}
          >
            0000
          </div>
        </div>
      </div>
    </div>
  )
}

export const MenuBottomLogo = () => {
  return (
    <div
      style={{
        width: 280,
        height: 95.22,
        marginTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 30,
        paddingBottom: 30,
        background: '#0E174A',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 5,
        display: 'inline-flex'
      }}
    >
      <div
        style={{
          width: '100%',
          height: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'inline-flex'
        }}
      >
        <Image
          src="/images/layout/bottom_logo.png"
          alt="Sidebar Logo"
          width={80}
          height={22}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div
        style={{
          alignSelf: 'stretch',
          color: '#DCDCDC',
          fontSize: 8,
          fontFamily: 'Poppins',
          fontWeight: '400',
          lineHeight: 2,
          wordWrap: 'break-word'
        }}
      >
        2021. UNIONE I&C. All rights reserved.
      </div>
    </div>
  )
}

export const MenuTitle = ({
  icon: Icon,
  title,
  isSelected,
  isExpanded,
  isSelectedMenu,
  menuIndex,
  onClick
}) => {
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

  const colorStyles = isSelected
    ? { backgroundColor: 'white', color: 'black' }
    : { color: '#fcfcfc' }

  return (
    <div style={{ ...baseStyles, ...colorStyles }}>
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
        >
          {title}
        </div>
      </div>

      {menuIndex > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '-2px' }}>
          {isExpanded ? (
            isSelectedMenu && (
              <ChevronDown
                style={{ width: '16px', height: '16px' }}
                color={isSelected ? 'black' : 'white'}
              />
            )
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

export const SubMenuTitle = ({ title, isSelected, onClick }) => {
  const containerStyle = {
    alignSelf: 'stretch',
    height: '40px',
    width: '240px',
    padding: '10px 15px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: isSelected ? 'white' : 'transparent',
    color: isSelected ? 'black' : '#fcfcfc'
  }

  const innerContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
    width: '100%'
  }

  const dotContainerStyle = {
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const dotStyle = {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: isSelected ? 'black' : '#fcfcfc'
  }

  const textStyle = {
    fontSize: '14px',
    fontWeight: 'normal',
    fontFamily: 'Noto Sans KR',
    lineHeight: '14px'
  }

  return (
    <div style={containerStyle} onClick={onClick}>
      <div style={innerContainerStyle}>
        <div style={dotContainerStyle}>
          <div style={dotStyle} />
        </div>
        <div style={textStyle}>{title}</div>
      </div>
    </div>
  )
}

export const MainMenuView = ({ onMenuItemClick }) => {
  return (
    <div
      style={{
        width: '280px',
        height: '100%',
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
        overflow: 'auto',
        background: '#0E174A'
      }}
    >
      {sidebarList.map((item, index) => (
        <div key={index} className="w-full">
          <MenuTitle
            icon={item.Icon}
            title={item.type}
            isSelected={false}
            isExpanded={false}
            isSelectedMenu={false}
            menuIndex={index}
            onClick={() => onMenuItemClick(index)}
          />
        </div>
      ))}
    </div>
  )
}

export default function ServerSidebar() {
  return (
    <>
      <MenuLogo />
      <MenuNotice />
      <MainMenuView />
      <MenuBottomLogo />
    </>
  )
}
