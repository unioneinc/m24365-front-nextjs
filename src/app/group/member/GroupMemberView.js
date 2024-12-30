'use client'

import React, { useState } from 'react'
import styles from './group-member.module.scss'
import { Button, Menu, MenuItem } from '@mui/material'
import Image from 'next/image'
import { Typo14, Typo16 } from '@/paths'

const CustomDropdown = ({ label, value, options, onChange }) => {
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

const GroupMemberView = () => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  console.log('GroupMemberView---------------------------')

  // Mock data for example
  const memberData = [
    {
      id: 1,
      company: 'M24365회사',
      userId: 'unione001',
      name: '문창기',
      phone: '010-1234-5678',
      email: 'cgmoon@unione.co.kr'
    },
    {
      id: 2,
      company: 'M24365회사',
      userId: 'unione002',
      name: '홍성주',
      phone: '010-1234-5678',
      email: 'sjhong@unione.co.kr'
    }
    // ... more data can be added
  ]

  const renderTableHeader = () => (
    <div className={styles.tableHead}>
      <div className={styles.cell}>소속회사</div>
      <div className={styles.cell}>아이디</div>
      <div className={styles.cell}>성명</div>
      <div className={styles.cell}>연락처</div>
      <div className={styles.cell}>이메일</div>
    </div>
  )

  const renderTableRow = (member) => (
    <div key={member.id} className={styles.tableRow}>
      <div className={styles.cell}>{member.company}</div>
      <div className={styles.cell}>{member.userId}</div>
      <div className={styles.cell}>{member.name}</div>
      <div className={styles.cell}>{member.phone}</div>
      <div className={styles.cell}>{member.email}</div>
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
        <Typo16>전체그룹</Typo16>
        <Button variant="contained" className={styles.groupSelectButton}>
          <span>그룹선택</span>
        </Button>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchFields}>
          <div className={styles.searchField}>
            <CustomDropdown
              label="소속회사"
              value="소속회사 전체"
              options={['소속회사 전체', 'M24365회사', '기타 회사']}
              onChange={() => {}}
            />
          </div>
        </div>
        <div className={styles.searchField}>
          <label className={styles.label}>키워드 검색</label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="아이디, 성명, 연락처, 이메일을 검색하세요."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Image src="/images/search_icon.png" alt="search" width={16} height={16} />
          </div>
        </div>
      </div>

      <div className={styles.table}>
        {renderTableHeader()}
        <div className={styles.tableBody}>{memberData.map(renderTableRow)}</div>
      </div>

      <div className={styles.footer}>
        <Button className={styles.downloadButton}>
          <Image src="/images/excel_icon.png" alt="excel" width={16} height={16} />
          엑셀 다운로드
        </Button>
        {renderPagination()}
        <div className={styles.count}>그룹 : 126</div>
      </div>
    </div>
  )
}

export default GroupMemberView
