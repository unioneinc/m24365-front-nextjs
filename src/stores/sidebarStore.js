import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSidebarStore = create(
  persist(
    (set) => ({
      isOpen: true,
      currentMenu: null,
      openItem: null,
      selectedItem: null,
      selectedSubItem: null,
      selectedMainItem: null,
      isExpanded: false,
      isChanged: false,
      toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
      setCurrentMenu: (menu) => set({ currentMenu: menu }),
      setOpenItem: (item) => set({ openItem: item }),
      setSelectedItem: (item) => set({ selectedItem: item }),
      setSelectedSubItem: (item) => set({ selectedSubItem: item }),
      setSelectedMainItem: (item) => set({ selectedMainItem: item }),
      handleSubMenuAction: (title, router) => {
        switch (title) {
          case '간편등록':
            router.push('/calendar')
            break
          case '유지보수관리':
            router.push('/maintenance')
            break
          case '서비스요청':
            router.push('/serviceRequest')
            break
          case '유상서비스':
            router.push('/paidService')
            break
          case '그룹등록/조회':
            router.push('/group')
            break
          case '그룹원조회':
            router.push('/group/member')
            break
          case '자산등록/조회':
            router.push('/asset')
            break
          case '자산일괄등록/조회':
            router.push('/asset/batch')
            break
          case '계약등록/조회':
            router.push('/contract')
            break
          case '정기점검 계약관리':
            router.push('/maintenance/regular')
            break
          case '서비스통계(리뉴얼)':
            router.push('/chart/service')
            break
          case '자산통계(리뉴얼)':
            router.push('/chart/asset')
            break
          case '엔지니어통계(리뉴얼)':
            router.push('/chart/engineer')
            break
          case '보고서 관리(리뉴얼)':
            router.push('/chart/report')
            break
          case '공지사항':
            router.push('/board/post')
            break
          case '설문조사':
            router.push('/survey')
            break
          case '템플릿 관리':
            router.push('/setting/template')
            break
          case '알림설정':
            router.push('/setting/notification')
            break
          case '1:1 문의사항':
            router.push('/board/inq')
            break
          case '자주하는 질문':
            router.push('/board/qust')
            break
          case '이용안내':
            router.push('/board/manual?tabIndex=0')
            break
          case '화면1':
            router.push('/contract/react')
            break
          case '그룹리스트':
            router.push('/groupTest/list/web')
            break
          default:
            break
        }
      }
    }),
    {
      name: 'sidebar-storage'
    }
  )
)
