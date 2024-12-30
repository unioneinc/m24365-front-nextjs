'use client'

import { SkeletonLoading, Typo14, Typo16 } from '@/paths'
import { Button, Menu, MenuItem } from '@mui/material'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { logger } from '~/lib/logger'
import styles from './asset.module.scss'
// use Hooks
import { useAsset } from '@/hooks/useAsset'
import { usePagination } from '@/hooks/usePagination'
import { useAuthStore } from '@/stores/modules.zustand/authentication'

export const CustomDropdown = ({ label, value, options, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    logger.info(`${label} 드롭다운 클릭`)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    logger.info(`${label} 드롭다운 닫기`)
    setAnchorEl(null)
  }

  const handleOptionSelect = (option) => {
    logger.info(`${label} 옵션 선택:`, option)
    onChange(option)
    handleClose()
  }

  return (
    <div className={styles.dropdown}>
      {label ? <Typo14>{label}</Typo14> : null}
      <Button
        onClick={handleClick}
        className={styles.select}
        sx={{
          justifyContent: 'space-between',
          padding: '8px 15px',
          textTransform: 'none',
          color: '#424242',
          backgroundColor: '#FDFDFD',
          '&:hover': {
            backgroundColor: '#FDFDFD'
          }
        }}
        endIcon={<Image src="/images/arrow_down_sky.png" alt="arrow" width={16} height={16} />}
      >
        {value}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleOptionSelect(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

const DropdownYearMonth = ({
  yearOptions = [],
  monthOptions = [],
  onYearChange,
  onMonthChange,
  label = '등록일'
}) => {
  const [selectedYear, setSelectedYear] = useState(yearOptions[0] || '2024년')
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0] || '1월')

  const [yearAnchorEl, setYearAnchorEl] = useState(null)
  const [monthAnchorEl, setMonthAnchorEl] = useState(null)

  const handleYearClick = (event) => {
    setYearAnchorEl(event.currentTarget)
  }

  const handleMonthClick = (event) => {
    setMonthAnchorEl(event.currentTarget)
  }

  const handleYearClose = () => {
    setYearAnchorEl(null)
  }

  const handleMonthClose = () => {
    setMonthAnchorEl(null)
  }

  const handleYearSelect = (year) => {
    setSelectedYear(year)
    if (onYearChange) onYearChange(year)
    handleYearClose()
  }

  const handleMonthSelect = (month) => {
    setSelectedMonth(month)
    if (onMonthChange) onMonthChange(month)
    handleMonthClose()
  }

  return (
    <div className={styles.dropdownYearMonth}>
      <div className={styles.label}>{label}</div>
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownWrapper}>
          <Button onClick={handleYearClick} className={styles.dropdownButton}>
            <span className={styles.text}>{selectedYear}</span>
            <Image src="/images/arrow_down_sky.png" alt="arrow" width={16} height={16} />
          </Button>

          <Menu
            anchorEl={yearAnchorEl}
            open={Boolean(yearAnchorEl)}
            onClose={handleYearClose}
            slotProps={{
              paper: {
                style: {
                  width: yearAnchorEl?.offsetWidth
                }
              }
            }}
          >
            {yearOptions.map((year) => (
              <MenuItem
                key={year}
                onClick={() => handleYearSelect(year)}
                sx={{
                  fontSize: '14px',
                  fontFamily: 'Noto Sans KR, sans-serif'
                }}
              >
                {year}
              </MenuItem>
            ))}
          </Menu>
        </div>

        <div className={styles.dropdownWrapper}>
          <Button onClick={handleMonthClick} className={styles.dropdownButton}>
            <span className={styles.text}>{selectedMonth}</span>
            <Image src="/images/arrow_down_sky.png" alt="arrow" width={16} height={16} />
          </Button>
          <Menu
            anchorEl={monthAnchorEl}
            open={Boolean(monthAnchorEl)}
            onClose={handleMonthClose}
            slotProps={{
              paper: {
                style: {
                  width: monthAnchorEl?.offsetWidth
                }
              }
            }}
          >
            {monthOptions.map((month) => (
              <MenuItem
                key={month}
                onClick={() => handleMonthSelect(month)}
                sx={{
                  fontSize: '14px',
                  fontFamily: 'Noto Sans KR, sans-serif'
                }}
              >
                {month}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
    </div>
  )
}

function AssetView() {
  // useHooks
  const myinfo = useAuthStore((state) => state.myinfo || {})
  const pagination = usePagination()
  const { actions: assetActions, state: assetState } = useAsset(pagination)
  const { fetchAssetFilter, handleSearchChange } = assetActions
  const {
    asstCateCdList,
    isLoading,
    error,
    assetList,
    searchKeyword: assetSearchKeyword
  } = assetState

  // useState
  const [searchKeyword, setSearchKeyword] = useState('')
  const [assetData, setAssetData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')

  // 자산 분류 코드 목록을 CustomDropdown 옵션 형식으로 변환
  const categoryOptions = useMemo(() => {
    return [
      { value: '', label: '자산분류 전체' },
      ...(asstCateCdList || []).map((category) => ({
        value: category.asstCateCd,
        label: category.asstCateCdNm
      }))
    ]
  }, [asstCateCdList])

  // Mock data
  const mockAssetData = [
    {
      id: 1,
      assetType: '자동화기기_공과금수납',
      assetName: '수납기10',
      groupName: '삼송그룹 DBMS 유지보수',
      location: '서울',
      modelName: 'Cameron',
      manufacturer: 'Orange',
      serial: 'KJ3Z98CN3B002ZM',
      registrationDate: '2024-06-30'
    }
  ]

  useEffect(() => {
    console.log('AssetView useEffect fetchAssetFilter')
    if (myinfo && myinfo.mbrNo) {
      console.log('AssetView useEffect myinfo.mbrNo', myinfo.mbrNo)
      console.log('AssetView useEffect pagination.currentPage', pagination.currentPage)
      fetchAssetFilter(myinfo.mbrNo)
    }
  }, [myinfo, pagination.currentPage, assetSearchKeyword])

  useEffect(() => {
    logger.info('AssetView 컴포넌트 마운트')
    setLoaded(true)
    return () => logger.info('AssetView 컴포넌트 언마운트')
  }, [])

  // useEffect(() => {
  //   logger.info('mockAssetData:', mockAssetData)
  // }, [mockAssetData])

  useEffect(() => {
    logger.info('현재 페이지:', pagination.currentPage)
  }, [pagination.currentPage])

  useEffect(() => {
    if (searchKeyword) {
      logger.info('검색어 변경:', searchKeyword)
    }
  }, [searchKeyword])

  // log useEffect ----------------------------------------------------------------------------------
  useEffect(() => {
    if (asstCateCdList && asstCateCdList.length > 0) {
      console.log('AssetView asstCateCdList:', asstCateCdList)
    }
  }, [asstCateCdList])

  const renderTableHeader = () => (
    <div className={styles.tableHead}>
      <div className={styles.cell}>자산분류</div>
      <div className={styles.cell}>자산명</div>
      <div className={styles.cell}>그룹명</div>
      <div className={styles.cell}>자산위치</div>
      <div className={styles.cell}>모델명</div>
      <div className={styles.cell}>제조사</div>
      <div className={styles.cell}>시리얼</div>
      <div className={styles.cell}>등록일</div>
    </div>
  )

  const renderTableRow = (asset) => (
    <div key={asset.id} className={styles.tableRow}>
      <div className={styles.cell}>{asset.asstCateCdNm}</div> {/* 자산분류 */}
      <div className={styles.cell}>{asset.asstNm}</div> {/* 자산명 */}
      <div className={styles.cell}>{asset.asstOwnsGpNm}</div> {/* 그룹명 */}
      <div className={styles.cell}>{asset.asstLoct}</div> {/* 자산위치 */}
      <div className={styles.cell}>{asset.asstMdNm}</div> {/* 모델명 */}
      <div className={styles.cell}>{asset.asstMk}</div> {/* 제조사 */}
      <div className={styles.cell}>{asset.asstCrlNo}</div> {/* 시리얼 */}
      <div className={styles.cell}>{asset.lastChgDt}</div> {/* 등록일 */}
    </div>
  )

  const renderPagination = () => {
    // const totalPages = 5 // 예시로 5페이지로 설정
    return (
      <div className={styles.pagination}>
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
        <div className={styles.pageNumbers}>
          {Array.isArray(pagination.paginationRange) &&
            pagination.paginationRange.map((pageNum) => (
              <Button
                key={pageNum}
                className={`${styles.pageNumber} ${pagination.currentPage === pageNum ? styles.active : ''}`}
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
    )
  }

  if (!loaded) {
    return <SkeletonLoading />
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typo16>전체 그룹이 보유한 자산목록</Typo16>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchFields}>
          <div className={styles.drowpdownYearMonth}>
            <DropdownYearMonth
              yearOptions={['2024년', '2023년', '2022년']}
              monthOptions={[
                '1월',
                '2월',
                '3월',
                '4월',
                '5월',
                '6월',
                '7월',
                '8월',
                '9월',
                '10월',
                '11월',
                '12월'
              ]}
              onYearChange={(year) => console.log('Selected year:', year)}
              onMonthChange={(month) => console.log('Selected month:', month)}
            />
          </div>
          <CustomDropdown
            label="자산분류"
            value={
              selectedCategory
                ? categoryOptions.find((opt) => opt.value === selectedCategory)?.label
                : '자산분류 전체'
            }
            options={categoryOptions.map((opt) => opt.label)}
            onChange={(label) => {
              const option = categoryOptions.find((opt) => opt.label === label)
              setSelectedCategory(option?.value || '')
            }}
          />
        </div>
        <div className={styles.searchField}>
          <label className={styles.label}>키워드 검색</label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="자산명, 그룹명, 자산위치, 모델명, 제조사, 시리얼을 검색하세요."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Image src="/images/search_icon.png" alt="search" width={16} height={16} />
          </div>
        </div>
      </div>

      <div className={styles.table}>
        {renderTableHeader()}
        <div className={styles.tableBody}>{assetList.map(renderTableRow)}</div>
      </div>

      <div className={styles.footer}>
        <Button className={styles.downloadButton}>
          <Image src="/images/excel_icon.png" alt="excel" width={16} height={16} />
          엑셀 다운로드
        </Button>
        {renderPagination()}
        <div className={styles.count}>자산 : {pagination.totalCount}</div>
      </div>
    </div>
  )
}

export default AssetView
