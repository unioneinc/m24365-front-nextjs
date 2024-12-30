// src/app/maintenance/MaintenanceRegular.js
'use client'

import React, { useState } from 'react'
import styles from './maintenance-regular.module.scss'
import { Button, Menu, MenuItem } from '@mui/material'
import Image from 'next/image'
import { Typo14, Typo16 } from '@/paths'

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

const MaintenanceRegular = () => {
  const [searchKeyword, setSearchKeyword] = useState('')

  // Mock data for service status
  const serviceStatus = {
    unregistered: 57,
    inProgress: 85,
    completed: 10,
    total: 120
  }

  const maintenanceData = [
    {
      contractName: '2024년도 상반기 DBMS 유지보수1',
      status: 'unregistered',
      inspectionTitle: '-',
      groupName: '삼송그룹 DBMS 유지보수',
      inspectionCycle: '분기',
      inspector: '-',
      inspectionDate: '-',
      processStatus: '미등록',
      progressLevel: 0
    }
    // ... more data
  ]

  const renderStatusCard = (title, count, color, borderColor, iconPng) => (
    <div className={styles.statusCard}>
      <div className={`${styles.cardContent} ${styles[borderColor]}`}>
        <div className={styles.cardInfo}>
          <div className={styles.count}>
            <span className={styles.number}>{count}</span>
            <span className={styles.unit}>건</span>
          </div>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={`${styles.iconWrapper} ${styles[color]}`}>
          {/* <div className={styles.icon} /> */}
          <Image src={iconPng} alt="icon" width={24} height={24} />
        </div>
      </div>
    </div>
  )

  const renderTableHeader = () => (
    <div className={styles.tableHead}>
      <div className={styles.cell}>계약명</div>
      <div className={styles.divider} />
      <div className={styles.cell}>점검제목</div>
      <div className={styles.cell}>그룹명</div>
      <div className={styles.cell}>점검주기</div>
      <div className={styles.cell}>점검담당자(정)</div>
      <div className={styles.cell}>점검일시</div>
      <div className={styles.statusCell}>
        <span>처리상태</span>
        <Image src="/images/info_icon.png" alt="info" width={16} height={16} />
      </div>
    </div>
  )

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typo16>정기점검 계약의 서비스 목록</Typo16>
        <Image src="/images/info_icon.png" alt="info" width={16} height={16} />
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.searchField}>
          <CustomDropdown
            label="점검일시"
            value="2024년"
            options={['2024년', '2023년', '2022년']}
            onChange={() => {}}
          />
          <CustomDropdown
            label=""
            value="전체"
            options={['전체', '1분기', '2분기', '3분기', '4분기']}
            onChange={() => {}}
          />
        </div>
        <div className={styles.searchField}>
          <CustomDropdown
            label="처리상태"
            value="처리상태 전체"
            options={['전체', '미등록', '작업대기', '작업진행', '승인대기', '평가대기', '완료보고']}
            onChange={() => {}}
          />
        </div>
        <div className={styles.searchField}>
          <label className={styles.label}>키워드 검색</label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="계약명, 그룹명, 점검제목을 검색하세요."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Image src="/images/search_icon.png" alt="search" width={16} height={16} />
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.statusCards}>
          {renderStatusCard(
            '미등록 서비스',
            serviceStatus.unregistered,
            'orange',
            'orangeBorder',
            '/images/unregistered_icon.png'
          )}
          {renderStatusCard(
            '진행중 서비스',
            serviceStatus.inProgress,
            'blue',
            'blueBorder',
            '/images/in_progress_icon.png'
          )}
          {renderStatusCard(
            '완료된 서비스',
            serviceStatus.completed,
            'indigo',
            'indigoBorder',
            '/images/completed_icon.png'
          )}
          {renderStatusCard(
            '계약 합계',
            serviceStatus.total,
            'gray',
            'grayBorder',
            '/images/total_icon.png'
          )}
        </div>
        <div className={styles.note}>
          하나의 계약으로 여러 서비스를 등록할 수 있으므로 계약 합계와 서비스 합계가 다를 수
          있습니다.
        </div>
        <div className={styles.table}>{renderTableHeader()}</div>
      </div>

      <div className={styles.footer}>
        <Button className={styles.downloadButton}>
          <Image src="/images/excel_icon.png" alt="excel" width={16} height={16} />
          엑셀 다운로드
        </Button>
        <div className={styles.count}>서비스 : 8</div>
      </div>
    </div>
  )
}

export default MaintenanceRegular
