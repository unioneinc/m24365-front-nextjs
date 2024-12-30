'use client'

import { useContract } from '@/hooks/useContract'
import { usePagination } from '@/hooks/usePagination'
import { Typo14, Typo16 } from '@/paths'
import { useAuthStore } from '@/stores/modules.zustand/authentication'
import { Button, Menu, MenuItem } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { logger } from '~/lib/logger'
import styles from './contract.module.scss'

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
        endIcon={<Image src="/images/arrow_down.png" alt="arrow" width={16} height={16} />}
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

const ContractView = () => {
  const router = useRouter()
  const myinfo = useAuthStore((state) => state.myinfo || {})
  const pagination = usePagination()
  const { actions: contractActions, state: contractState } = useContract(pagination)

  const { fetchContractFilter, handleSearchChange } = contractActions
  const {
    contractList,
    isLoading,
    error,
    searchKeyword: contractSearchKeyword,
    currentPage,
    totalCount
  } = contractState

  // 컴포넌트 마운트 시 계약 목록 조회
  // useEffect(() => {
  //   logger.info('ContractView 컴포넌트 마운트')
  //   if (myinfo?.mbrNo) {
  //     fetchContractFilter(myinfo.mbrNo)
  //   }
  //   return () => logger.info('ContractView 컴포넌트 언마운트')
  // }, [myinfo])

  // 페이지 변경 시 목록 재조회
  // useEffect(() => {
  //   if (myinfo?.mbrNo) {
  //     fetchContractFilter(myinfo.mbrNo)
  //   }
  // }, [pagination.currentPage, contractSearchKeyword])

  const renderTableHeader = () => (
    <div className={styles.tableHead}>
      <div className={styles.cell}>계약유형</div>
      <div className={styles.cell}>계약체결일</div>
      <div className={styles.cell}>계약명</div>
      <div className={styles.cell}>그룹명</div>
      <div className={styles.cell}>소속회사</div>
      <div className={styles.cell}>담당업체</div>
      <div className={styles.cell}>계약기간</div>
      <div className={styles.cell}>계약금액</div>
    </div>
  )

  const renderTableRow = (contract) => (
    <div key={contract.id} className={styles.tableRow}>
      <div className={styles.cell}>{contract.contractType}</div>
      <div className={styles.cell}>{contract.contractDate}</div>
      <div className={styles.cell}>{contract.contractName}</div>
      <div className={styles.cell}>{contract.groupName}</div>
      <div className={styles.cell}>{contract.company}</div>
      <div className={styles.cell}>{contract.contractor}</div>
      <div className={styles.cell}>{contract.period}</div>
      <div className={styles.cell}>{contract.amount}</div>
    </div>
  )

  const renderPagination = () => (
    <div className={styles.pagination}>
      <div className={styles.pageControl}>
        <Button
          className={styles.controlButton}
          onClick={pagination.goToFirstPage}
          disabled={currentPage === 1}
        >
          &lt;&lt;
        </Button>
        <Button
          className={styles.controlButton}
          onClick={pagination.goToPrevPage}
          disabled={currentPage === 1}
        >
          &lt;
        </Button>
      </div>
      <div className={styles.pageNumbers}>
        {Array.isArray(pagination.paginationRange) &&
          pagination.paginationRange.map((pageNum) => (
            <Button
              key={pageNum}
              className={`${styles.pageNumber} ${currentPage === pageNum ? styles.active : ''}`}
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
          disabled={currentPage === pagination.totalPages}
        >
          &gt;
        </Button>
        <Button
          className={styles.controlButton}
          onClick={pagination.goToLastPage}
          disabled={currentPage === pagination.totalPages}
        >
          &gt;&gt;
        </Button>
      </div>
    </div>
  )

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typo16>그룹이 보유한 전체 계약목록</Typo16>
        <Button
          variant="contained"
          className={styles.registerButton}
          onClick={() => router.push('/contract/register')}
        >
          <Image src="/images/register_icon.png" alt="register" width={16} height={16} />
          <span>계약등록</span>
        </Button>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchFields}>
          <CustomDropdown
            label="계약체결일"
            value="2024년"
            options={['2024년', '2023년', '2022년']}
            onChange={() => {}}
          />
          <CustomDropdown
            label="계약유형"
            value="계약유형 전체"
            options={['전체', '유지보수', '유상서비스']}
            onChange={() => {}}
          />
          <div className={styles.searchField}>
            <label className={styles.label}>키워드 검색</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="계약명, 그룹명, 담당업체를 검색하세요."
                value={contractSearchKeyword}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <Image src="/images/search_icon.png" alt="search" width={16} height={16} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.table}>
        {renderTableHeader()}
        <div className={styles.tableBody}>
          {isLoading ? (
            <div className={styles.loading}>로딩 중...</div>
          ) : error ? (
            <div className={styles.error}>에러가 발생했습니다: {error.message}</div>
          ) : (
            contractList.map(renderTableRow)
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <Button className={styles.downloadButton}>
          <Image src="/images/excel_icon.png" alt="excel" width={16} height={16} />
          엑셀 다운로드
        </Button>
        {renderPagination()}
        <div className={styles.count}>계약 : {totalCount}</div>
      </div>
    </div>
  )
}

export default ContractView
