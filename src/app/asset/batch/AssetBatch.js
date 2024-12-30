// src/app/asset/AssetBatch.js
'use client'

import React, { useState, useEffect } from 'react'
import styles from './asset-batch.module.scss'
import { Button, Menu, MenuItem } from '@mui/material'
import Image from 'next/image'
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

const AssetBatch = () => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [mounted, setMounted] = useState(false)

  console.log('AssetBatch rendered')

  useEffect(() => {
    setMounted(true)
  }, [])

  const renderTableHeader = () => (
    <div className={styles.tableHead}>
      <div className={styles.cell}>식별번호</div>
      <div className={styles.cell}>자산분류</div>
      <div className={styles.cell}>자산명</div>
      <div className={styles.cell}>그룹명</div>
      <div className={styles.cell}>자산위치</div>
      <div className={styles.cell}>모델명</div>
      <div className={styles.cell}>제조사</div>
      <div className={styles.cell}>시리얼</div>
    </div>
  )

  const renderNoData = () => <div className={styles.noData}>등록된 자산이 없습니다.</div>

  return !mounted ? (
    <SkeletonLoading />
  ) : (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typo16>그룹별 자산 일괄관리 목록</Typo16>
      </div>

      <div className={styles.searchContainer}>
        <div className={styles.groupHeader}>
          <div className={styles.groupTitle}>인프라 서버 유지보수 그룹</div>
          <Button className={styles.groupSelectButton}>
            <span>그룹선택</span>
          </Button>
        </div>

        <div className={styles.searchFields}>
          <div className={styles.dropdownWrapper}>
            <CustomDropdown
              label="자산분류"
              value="자산분류 전체"
              options={['전체', '서버', '네트워크', '스토리지']}
              onChange={() => {}}
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
      </div>

      <div className={styles.table}>
        {renderTableHeader()}
        {renderNoData()}
      </div>

      <div className={styles.footer}>
        <div className={styles.count}>자산 : 0</div>
      </div>
    </div>
  )
}

export default AssetBatch
