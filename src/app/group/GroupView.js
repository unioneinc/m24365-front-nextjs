// src/app/group/GroupView.js
'use client'

import { Typo14, Typo16 } from '@/paths'
import { Button, Menu, MenuItem } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import styles from './group.module.scss'
// use Hooks
import { useModal } from '@/features/modal/modal-system'
import { useGroup } from '@/hooks/useGroup'
import { usePagination } from '@/hooks/usePagination'
import { useAuthStore } from '@/stores/modules.zustand/authentication'

// CustomDropdown Component
export const CustomDropdown = ({ label, value, options, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={styles.dropdown}>
      <Typo14>{label}</Typo14>
      <Button
        onClick={handleClick}
        className={styles.select}
        endIcon={<Image src="/images/arrow_down_sky.png" alt="arrow" width={16} height={16} />}
      >
        {value}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => {
              onChange(option)
              handleClose()
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

// Mock data for example
const mockGroupData = [
  {
    id: 1,
    isMain: true,
    company: 'M24365회사',
    groupType: '회사',
    groupName: '00그룹 DBMS 유지보수',
    manager: '김훈',
    location: '서울',
    code: 's-sd-1',
    role: '회사대표',
    status: '마스터(Master)'
  }
  // ... more data
]

// MyModal 컴포넌트는 async를 제거
const MyModal = ({ onClose, onSubmit, data }) => {
  return (
    <div>
      <div>MyModal</div>
      <button onClick={onClose}>닫기</button>
      <button onClick={() => onSubmit('결과')}>확인</button>
    </div>
  )
}

export default function GroupView() {
  // 인증 스토어에서 사용자 정보 가져오기
  const myinfo = useAuthStore((state) => state.myinfo || {})
  // modal
  const { openModal, closeModal } = useModal()

  // usePagination 훅 초기화
  const pagination = usePagination()

  // useGroup 훅 사용
  const { actions: groupActions, state: groupState } = useGroup(pagination)
  const { fetchGroupFilter, handleSearchChange } = groupActions
  const { gpTyCdList, isLoading, error, groupList, searchKeyword: groupSearchKeyword } = groupState

  // Next.js 라우터 사용
  const router = useRouter()

  // 로컬 검색어 상태
  const [localSearchKeyword, setLocalSearchKeyword] = useState('')

  // 검색어 입력 핸들러 - 로컬 상태만 업데이트
  const handleSearchInput = useCallback((e) => {
    setLocalSearchKeyword(e.target.value)
  }, [])

  // 검색 실행 핸들러
  const handleSearchSubmit = useCallback(() => {
    handleSearchChange(localSearchKeyword)
  }, [handleSearchChange, localSearchKeyword])

  // 엔터키 처리
  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        handleSearchSubmit()
      }
    },
    [handleSearchSubmit]
  )

  // 그룹 목록 조회 요청 (검색어 변경 시에도 호출)
  useEffect(() => {
    if (myinfo && myinfo.mbrNo) {
      fetchGroupFilter(myinfo.mbrNo)
    }
  }, [myinfo, pagination.currentPage, groupSearchKeyword])

  // 디버깅용 로그 (개발 환경에서만)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('GroupView state:', {
        isLoading,
        groupList: groupList && groupList.length,
        error: error && error.message
      })
    }
  }, [isLoading, groupList, error])

  // async/await 대신 Promise 체이닝 사용
  const handleRegisterButtonClick = () => {
    openModal(MyModal, {
      data: '그룹등록 버튼 클릭'
    })
      .then((result) => {
        console.log('모달 결과:', result)
        // 결과 처리
      })
      .catch((error) => {
        console.log('모달 취소됨:', error)
      })
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <Typo16>그룹등록 및 그룹 정보 조회</Typo16>
        <Button
          variant="contained"
          className={styles.registerButton}
          onClick={handleRegisterButtonClick}
        >
          <Image src="/images/register_icon.png" alt="register" width={16} height={16} />
          <span>그룹등록</span>
        </Button>
      </div>

      {/* 검색 컨테이너 */}
      <div className={styles.searchContainer}>
        <div className={styles.searchFields}>
          <CustomDropdown
            label="그룹유형"
            value="그룹유형 전체"
            options={['전체', '회사', '업무']}
            onChange={(selectedOption) => {
              // 그룹유형 변경 로직 추가 필요
              console.log('선택된 그룹유형:', selectedOption)
            }}
          />
          <CustomDropdown
            label="상태"
            value="상태 전체"
            options={['전체', '마스터', '어드민', '맴버']}
            onChange={(selectedOption) => {
              // 상태 변경 로직 추가 필요
              console.log('선택된 상태:', selectedOption)
            }}
          />
        </div>
        <div className={styles.searchField}>
          <label className={styles.label}>키워드 검색</label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="그룹명, 소속위치, 관리코드를 검색하세요."
              value={localSearchKeyword}
              onChange={handleSearchInput}
              onKeyPress={handleKeyPress}
            />
            <button className={styles.searchButton} onClick={handleSearchSubmit}>
              <Image src="/images/search_icon.png" alt="search" width={16} height={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 테이블 */}
      <div className={styles.table}>
        {/* 테이블 헤더 렌더링 함수 */}
        <div className={styles.tableHead}>
          <div className={styles.cell}>메인그룹</div>
          <div className={styles.cell}>소속회사</div>
          <div className={styles.cell}>그룹유형</div>
          <div className={styles.cell}>그룹명</div>
          <div className={styles.cell}>그룹장</div>
          <div className={styles.cell}>소속위치</div>
          <div className={styles.cell}>관리코드</div>
          <div className={styles.cell}>나의 담당업무</div>
          <div className={styles.cell}>상태</div>
        </div>
        <div className={styles.tableBody}>
          {Array.isArray(groupList) &&
            groupList.map((group) => (
              <div key={group.id} className={styles.tableRow}>
                <div className={styles.cell}>
                  <div className={`${styles.switch} ${group.isMain ? styles.active : ''}`}>
                    <div className={styles.circle} />
                  </div>
                </div>
                <div className={styles.cell}>{group.gpComNm}</div>
                <div className={styles.cell}>{group.gpTyCdNm}</div>
                <div className={styles.cell}>{group.gpNm}</div>
                <div className={styles.cell}>{group.mbrNm}</div>
                <div className={styles.cell}>{group.gpLocNm}</div>
                <div className={styles.cell}>{group.gpCd}</div>
                <div className={styles.cell}>{group.role}</div>
                <div className={styles.cell}>
                  {group.status === '대기' ? (
                    <div className={styles.buttonGroup}>
                      <Button className={styles.rejectButton}>거절</Button>
                      <Button className={styles.acceptButton}>수락</Button>
                    </div>
                  ) : (
                    group.status
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* 푸터 */}
      <div className={styles.footer}>
        <Button className={styles.downloadButton}>
          <Image src="/images/excel_icon.png" alt="excel" width={16} height={16} />
          엑셀 다운로드
        </Button>
        <div className={styles.pagination}>
          {/* 페이지 컨트롤 (이전) */}
          <div className={styles.pageControl}>
            <Button
              className={styles.controlButton}
              onClick={pagination.goToFirstPage}
              disabled={pagination.currentPage === 1}
            >
              &lt;&lt;
            </Button>
            <Button
              className={styles.controlButton}
              onClick={pagination.goToPrevPage}
              disabled={pagination.currentPage === 1}
            >
              &lt;
            </Button>
          </div>

          {/* 페이지 번호 */}
          <div className={styles.pageNumbers}>
            {Array.isArray(pagination.paginationRange) &&
              pagination.paginationRange.map((pageNum) => (
                <Button
                  key={pageNum}
                  className={`${styles.pageNumber} ${
                    pagination.currentPage === pageNum ? styles.active : ''
                  }`}
                  onClick={() => pagination.goToPage(pageNum)}
                >
                  {pageNum}
                </Button>
              ))}
          </div>

          <div className={styles.pageControl}>
            <Button
              className={styles.controlButton}
              onClick={pagination.goToNextPage}
              disabled={pagination.currentPage === pagination.totalPages}
            >
              &gt;
            </Button>
            <Button
              className={styles.controlButton}
              onClick={pagination.goToLastPage}
              disabled={pagination.currentPage === pagination.totalPages}
            >
              &gt;&gt;
            </Button>
          </div>
        </div>
        <div className={styles.count}>그룹 : {groupState.totalCount || 0}</div>
      </div>
    </div>
  )
}
