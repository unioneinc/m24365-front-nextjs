// src/app/calendar/CalendarView.js
'use client'

import React, { useState } from 'react'
import styles from './calendar.module.scss'
import { Button, Menu, MenuItem } from '@mui/material'
import Image from 'next/image'
import { Typo14, Typo16 } from '@/paths'
import ScheduleGroup from './components/ScheduleGroup'

const Header = () => {
  return (
    <div className={styles.header}>
      <Typo16>서비스관리 스케줄 간편등록</Typo16>
      <Button variant="contained" className={styles.registerButton}>
        <Image src="/images/register_icon.png" alt="register" width={16} height={16} />
        <span>서비스등록</span>
      </Button>
    </div>
  )
}

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

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState('')

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchFields}>
        <CustomDropdown
          label="계약유형"
          value="계약유형 전체"
          options={['전체', '유지보수', '유상서비스']}
          onChange={() => {}}
        />
      </div>
      <div className={styles.searchField}>
        <label className={styles.label}>키워드 검색</label>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="계약회사명, 계약명을 입력해주세요."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <Image src="/images/search_icon.png" alt="search" width={16} height={16} />
        </div>
      </div>
    </div>
  )
}

const Bottom = () => {
  return (
    <div className={styles.bottom}>
      <Button className={styles.downloadButton}>
        <Image src="/images/excel_icon.png" alt="excel" width={16} height={16} />
        다운로드
      </Button>
      <div className={styles.statusWrapper}>
        <div className={styles.statusItem}>
          <span>작업대기</span>
          <div className={styles.statusDot} style={{ background: '#FF9D9D' }} />
        </div>
        <div className={styles.statusItem}>
          <span>작업진행</span>
          <div className={styles.statusDot} style={{ background: '#FFC37B' }} />
        </div>
        <div className={styles.statusItem}>
          <span>승인대기</span>
          <div className={styles.statusDot} style={{ background: '#9BD5ED' }} />
        </div>
      </div>
    </div>
  )
}

const CalendarView = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Search />
      <ScheduleGroup />
      <Bottom />
    </div>
  )
}

export default CalendarView
