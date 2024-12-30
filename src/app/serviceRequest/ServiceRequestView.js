'use client'

import React, { useState, useEffect } from 'react'
import styles from './service-request.module.scss'
import { Button, Menu, MenuItem } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Typo14, Typo16 } from '@/paths'
import { SkeletonLoading } from '@/paths'

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

const ServiceRequest = () => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState('personal') // personal or all
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock data for example
  const serviceData = [
    {
      id: 1,
      type: '정기점검(요청)',
      title: '2024년 하반기 정보시스템 통합 유지보수 용역 계약',
      groupName: '유니원아이앤씨',
      requester: '이민지',
      manager: '박지우',
      requestDate: '2024-12-10 11:40',
      status: '요청대기',
      progressLevel: 1
    }
    // ... more data can be added here
  ]

  const renderProgressBar = (level) => {
    return (
      <div className={styles.progressBar}>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={`${styles.progressStep} ${index < level ? styles.active : ''}`}
          />
        ))}
      </div>
    )
  }

  const renderTableHeader = () => (
    <div className={styles.tableHead}>
      <div className={styles.cell}>점검유형</div>
      <div className={styles.cell}>요청제목</div>
      <div className={styles.cell}>그룹명</div>
      <div className={styles.cell}>요청자</div>
      <div className={styles.cell}>점검담당자(정)</div>
      <div className={styles.cell}>요청일시</div>
      <div className={styles.cell}>처리상태</div>
    </div>
  )

  const renderTableRow = (service) => (
    <div key={service.id} className={styles.tableRow}>
      <div className={styles.cell}>{service.type}</div>
      <div className={styles.cell}>{service.title}</div>
      <div className={styles.cell}>{service.groupName}</div>
      <div className={styles.cell}>{service.requester}</div>
      <div className={styles.cell}>{service.manager}</div>
      <div className={styles.cell}>{service.requestDate}</div>
      <div className={styles.statusCell}>
        <span>{service.status}</span>
        {renderProgressBar(service.progressLevel)}
      </div>
    </div>
  )

  const renderPagination = () => {
    const totalPages = 5
    return (
      <div className={styles.pagination}>
        <div className={styles.pageControl}>
          <Button className={styles.controlButton}>&lt;&lt;</Button>
          <Button className={styles.controlButton}>&lt;</Button>
        </div>
        <div className={styles.pageNumbers}>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              className={`${styles.pageNumber} ${currentPage === i + 1 ? styles.active : ''}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
        <div className={styles.pageControl}>
          <Button className={styles.controlButton}>&gt;</Button>
          <Button className={styles.controlButton}>&gt;&gt;</Button>
        </div>
      </div>
    )
  }

  return !mounted ? (
    <SkeletonLoading />
  ) : (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typo16>서비스요청 목록</Typo16>
        <Button
          variant="contained"
          className={styles.requestButton}
          onClick={() => router.push('/service/request')}
        >
          <Image src="/images/register_icon.png" alt="request" width={16} height={16} />
          <span>서비스요청</span>
        </Button>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.viewToggle}>
          <Typo14>정렬</Typo14>
          <div className={styles.toggleGroup}>
            <Button
              className={`${styles.toggleButton} ${viewMode === 'personal' ? styles.active : ''}`}
              onClick={() => setViewMode('personal')}
            >
              나만보기
            </Button>
            <Button
              className={`${styles.toggleButton} ${viewMode === 'all' ? styles.active : ''}`}
              onClick={() => setViewMode('all')}
            >
              전체보기
            </Button>
          </div>
        </div>

        <CustomDropdown
          label="점검일시"
          value="2024년"
          options={['2024년', '2023년', '2022년']}
          onChange={() => {}}
        />

        <CustomDropdown
          label="점검유형"
          value="점검유형 전체"
          options={['전체', '정기점검', '장애점검']}
          onChange={() => {}}
        />

        <CustomDropdown
          label="처리상태"
          value="처리상태 전체"
          options={['전체', '요청대기', '작업진행', '승인대기', '완료']}
          onChange={() => {}}
        />

        <div className={styles.searchField}>
          <label className={styles.label}>키워드 검색</label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="요청제목, 그룹명, 요청자, 점검담당자(정)을 검색하세요."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Image src="/images/search_icon.png" alt="search" width={16} height={16} />
          </div>
        </div>
      </div>

      <div className={styles.table}>
        {renderTableHeader()}
        <div className={styles.tableBody}>{serviceData.map(renderTableRow)}</div>
      </div>

      <div className={styles.footer}>
        <Button className={styles.downloadButton}>
          <Image src="/images/excel_icon.png" alt="excel" width={16} height={16} />
          엑셀 다운로드
        </Button>
        {renderPagination()}
        <div className={styles.count}>서비스 : 5000</div>
      </div>
    </div>
  )
}

export default ServiceRequest
