// src/app/paid-service/PaidService.js
'use client'

import React, { useState } from 'react'
import styles from './paid-service.module.scss'
import { Button, Menu, MenuItem } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Typo14, Typo16 } from '@/paths'

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

const PaidService = () => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [serviceData, setServiceData] = useState([])
  const router = useRouter()

  // Mock data for example
  const paidServiceData = [
    {
      id: 1,
      serviceType: '유상서비스',
      serviceDate: '2023-06-01',
      serviceName: '2024년도 상반기 DBMS 유상서비스1',
      groupName: '삼송그룹 DBMS 유상서비스',
      company: 'M24365',
      serviceProvider: '엠씨티티코어(주)',
      period: '2023-05-18 ~ 2024-05-17',
      fee: '1,900,000원'
    }
  ]

  const renderTableHeader = () => (
    <div className={styles.tableHead}>
      <div className={styles.cell}>서비스 유형</div>
      <div className={styles.cell}>서비스 일자</div>
      <div className={styles.cell}>서비스명</div>
      <div className={styles.cell}>그룹명</div>
      <div className={styles.cell}>소속회사</div>
      <div className={styles.cell}>서비스 제공자</div>
      <div className={styles.cell}>서비스 기간</div>
      <div className={styles.cell}>서비스 비용</div>
    </div>
  )

  const renderTableRow = (service) => (
    <div key={service.id} className={styles.tableRow}>
      <div className={styles.cell}>{service.serviceType}</div>
      <div className={styles.cell}>{service.serviceDate}</div>
      <div className={styles.cell}>{service.serviceName}</div>
      <div className={styles.cell}>{service.groupName}</div>
      <div className={styles.cell}>{service.company}</div>
      <div className={styles.cell}>{service.serviceProvider}</div>
      <div className={styles.cell}>{service.period}</div>
      <div className={styles.cell}>{service.fee}</div>
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typo16>그룹이 보유한 전체 서비스목록</Typo16>
        <Button
          variant="contained"
          className={styles.registerButton}
          onClick={() => router.push('/paid-service/register')}
        >
          <Image src="/images/register_icon.png" alt="register" width={16} height={16} />
          <span>서비스 등록</span>
        </Button>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchFields}>
          <CustomDropdown
            label="서비스 일자"
            value="2024년"
            options={['2024년', '2023년', '2022년']}
            onChange={() => {}}
          />
          <CustomDropdown
            label="서비스 유형"
            value="서비스 유형 전체"
            options={['전체', '정기점검', '긴급점검', '기술지원']}
            onChange={() => {}}
          />
        </div>
        <div className={styles.searchField}>
          <label className={styles.label}>키워드 검색</label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="서비스명, 그룹명, 서비스 제공자를 검색하세요."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Image src="/images/search_icon.png" alt="search" width={16} height={16} />
          </div>
        </div>
      </div>

      <div className={styles.table}>
        {renderTableHeader()}
        <div className={styles.tableBody}>{paidServiceData.map(renderTableRow)}</div>
      </div>

      <div className={styles.footer}>
        <Button className={styles.downloadButton}>
          <Image src="/images/excel_icon.png" alt="excel" width={16} height={16} />
          엑셀 다운로드
        </Button>
        {renderPagination()}
        <div className={styles.count}>서비스 : 2,500</div>
      </div>
    </div>
  )
}

export default PaidService
