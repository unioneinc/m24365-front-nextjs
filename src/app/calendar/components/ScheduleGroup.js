'use client'

import React, { useState } from 'react'
import { Button } from '@mui/material'
import Image from 'next/image'
import styles from './schedule-group.module.scss'
import { Typo16 } from '@/paths'

const ContractList = () => {
  const contracts = Array(20).fill('계약회사명 / 계약명')
  return (
    <div className={styles.contractList}>
      {contracts.map((contract, index) => (
        <div key={index} className={`${styles.contractItem} ${index === 4 ? styles.active : ''}`}>
          {contract}
        </div>
      ))}
    </div>
  )
}

const ScheduleGroup = () => {
  const [viewMode, setViewMode] = useState('month') // month, week, day
  const weekDays = ['일', '월', '화', '수', '목', '금', '토']

  const renderCalendarHeader = () => (
    <div className={styles.calendarHeader}>
      {weekDays.map((day, index) => (
        <div key={index} className={`${styles.dayHeader} ${index === 0 ? styles.sunday : ''}`}>
          {day}
        </div>
      ))}
    </div>
  )

  const renderDateCell = (date) => {
    const schedules = [
      { title: '점검제목', type: 'red' },
      { title: '점검제목', type: 'blue' },
      { title: '점검제목', type: 'orange' }
    ]

    return (
      <div className={styles.dateCell}>
        <div className={styles.dateNumber}>{date}</div>
        {schedules.map((schedule, index) => (
          <div key={index} className={`${styles.schedule} ${styles[schedule.type]}`}>
            {schedule.title}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <Typo16>최근 생성된 계약 목록</Typo16>
            <div className={styles.subText}>
              계약을 드래그하여 서비스를 진행할 날짜에 넣어주세요.
            </div>
          </div>
          <Button className={styles.refreshButton}>
            <Image src="/images/refresh_icon.png" alt="refresh" width={16} height={16} />
          </Button>
        </div>
        <div className={styles.listWrapper}>
          <ContractList />
          <div className={styles.divider} />
        </div>
        <div className={styles.pagination}>{/* Pagination controls */}</div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.calendarHeader}>
          <div className={styles.dateTitle}>2024년 12월 19일</div>
          <div className={styles.controls}>
            <div className={styles.dateControls}>
              <Button className={styles.controlButton}>
                <Image src="/images/arrow_left.png" alt="prev" width={16} height={16} />
              </Button>
              <Button className={styles.todayButton}>TODAY</Button>
              <Button className={styles.controlButton}>
                <Image src="/images/arrow_right.png" alt="next" width={16} height={16} />
              </Button>
            </div>
            <div className={styles.viewControls}>
              {['월간', '주간', '일일'].map((mode) => (
                <Button
                  key={mode}
                  className={`${styles.viewButton} ${viewMode === mode ? styles.active : ''}`}
                  onClick={() => setViewMode(mode)}
                >
                  {mode}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.calendar}>
          {renderCalendarHeader()}
          <div className={styles.calendarBody}>{/* Calendar grid implementation */}</div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleGroup
