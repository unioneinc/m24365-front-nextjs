'use client'

import React, { useEffect } from 'react'
import moment from 'moment'
// user components
import { logger } from '~/lib/logger'
import { useAuthStore } from '@/stores/modules.zustand/authentication'
import { Pagination } from '@/paths'

export const Asset = () => {
  const { myinfo } = useAuthStore()

  console.log('---Asset---')

  useEffect(() => {
    logger.info('Asset 초기화 시작')
    // logger.info('myinfo', myinfo)
  }, [myinfo])

  // useEffect(() => {
  //   fetchAsstCateCdList()
  // }, []);

  // useEffect(() => {
  //   console.log('asstCateCdList', asstCateCdList)
  // }, [asstCateCdList])

  // useEffect(() => {
  //   fetchAssetPageFilter()
  //   // simplePageFilter()
  // }, [])

  // useEffect(() => {
  //   console.log('assetList data', data)
  // }, [data])

  // useEffect(() => {
  //   fetchAssetListData()
  // }, [])

  // useEffect(() => {
  //   console.log('assetList data', data)
  // }, [data])

  const renderTableHeader = () => (
    <div className={styles.tableHead}>
      <div key="assetType" className={`${styles.headCell} ${styles.assetType}`}>
        자산분류
      </div>
      <div key="assetName" className={`${styles.headCell} ${styles.assetName}`}>
        자산명
      </div>
      <div key="groupName" className={`${styles.headCell} ${styles.groupName}`}>
        그룹명
      </div>
      <div key="location" className={`${styles.headCell} ${styles.location}`}>
        자산위치
      </div>
      <div key="modelName" className={`${styles.headCell} ${styles.modelName}`}>
        모델
      </div>
      <div key="manufacturer" className={`${styles.headCell} ${styles.manufacturer}`}>
        제조사
      </div>
      <div key="serial" className={`${styles.headCell} ${styles.serial}`}>
        시리얼
      </div>
      <div key="registrationDate" className={`${styles.headCell} ${styles.registrationDate}`}>
        등록일
      </div>
    </div>
  )

  const renderTableRow = ({ asset, index }) => (
    <div key={`asset-${asset.asstCrlNo}-${index}`} className={styles.tableRow}>
      <div className={`${styles.cell} ${styles.assetType}`}>{asset.asstCateCdNm}</div>
      <div className={`${styles.cell} ${styles.assetName}`}>{asset.asstNm}</div>
      <div className={`${styles.cell} ${styles.groupName}`}>{asset.asstOwnsGpNm}</div>
      <div className={`${styles.cell} ${styles.location}`}>{asset.asstLoct}</div>
      <div className={`${styles.cell} ${styles.modelName}`}>{asset.asstMdNm}</div>
      <div className={`${styles.cell} ${styles.manufacturer}`}>{asset.asstMk}</div>
      <div className={`${styles.cell} ${styles.serial}`}>{asset.asstCrlNo}</div>
      <div className={`${styles.cell} ${styles.registrationDate}`}>{asset.asstInstDate}</div>
    </div>
  )

  const renderPagination = () => (
    <div className={styles.pagination}>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPageLoad={async () => Promise.resolve()}
      />
    </div>
  )

  return <div>Asset Component</div>
}

export default Asset
