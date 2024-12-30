'use client'

import React, { useEffect } from 'react'
import { Button } from '@mui/material'
import styles from './group.module.scss'
import { ButtonGroupRegister } from './ui/GroupComponents'
import { Image } from 'next/image'
import Pagination from '@/features/pagination/Pagination'
import GroupSearchSection from './ui/GroupSearchSection'
// import { GROUP_TYPE_OPTIONS, STATUS_OPTIONS } from '@/utils.ts/groupUtils'
import { Typo16 } from '@/app/modules/components/misc/Typo'
import { GroupSwitch } from './ui/GroupSwitch'
import { useRouter } from 'next/navigation'

const TABLE_COLUMNS = [
  {
    key: 'isMainGroup',
    label: '메인',
    render: (value, group, props) => {
      return (
        <div className={`${styles.cell} ${styles.mainGroup}`} onClick={(e) => e.stopPropagation()}>
          <GroupSwitch
            checked={!!group.isMainGroup}
            disabled={props.mainGroupId !== null && props.mainGroupId !== Number(group.id)}
            onChange={(checked) => props.onMainGroupToggle(Number(group.id), checked)}
          />
        </div>
      )
    }
  },
  { key: 'company', label: '회사명' },
  { key: 'groupType', label: '그룹유형' },
  { key: 'groupName', label: '그룹명' },
  { key: 'groupLeader', label: '그룹장' },
  { key: 'locationText', label: '지역' },
  { key: 'managementCode', label: '관리코드' },
  { key: 'myRoleText', label: '나의역할' },
  {
    key: 'groupMemberStatus',
    label: '권한',
    render: (value) => {
      if (typeof value === 'string' && value === 'WAITING') {
        return <span style={{ color: 'red' }}>대기</span>
      }
      return <span>{value}</span>
    }
  }
]

const GroupView = ({
  filteredGroupList
  //   currentPage,
  //   totalPages,
  //   totalCount,
  //   searchParams,
  //   onTableRowClick,
  //   onGroupTypeChange,
  //   onStatusChange,
  //   onSearchChange,
  //   onPageChange,
  //   onExcelDownload,
  //   onGroupRegister,
  //   mainGroupId,
  //   onMainGroupToggle,
}) => {
  const router = useRouter()

  //   useEffect(() => {
  //     console.log(filteredGroupList)
  //   }, [filteredGroupList])

  const renderTableHeader = () => (
    <div className={styles.tableHeader}>
      {TABLE_COLUMNS.map((column) => (
        <div key={column.key} className={styles.tableCell}>
          {column.label}
        </div>
      ))}
    </div>
  )

  //   const renderTableRow = (group) => (
  //     <div key={group.id} className={styles.tableRow} onClick={() => onTableRowClick(group)}>
  //       {TABLE_COLUMNS.map(column => (
  //         <div key={column.key} className={styles.tableCell}>
  //           {column.render
  //             ? column.render(group[column.key], group, {
  //                 filteredGroupList,
  //                 currentPage,
  //                 totalPages,
  //                 totalCount,
  //                 searchParams,
  //                 onTableRowClick,
  //                 onGroupTypeChange,
  //                 onStatusChange,
  //                 onSearchChange,
  //                 onPageChange,
  //                 onExcelDownload,
  //                 onGroupRegister,
  //                 mainGroupId,
  //                 onMainGroupToggle,
  //               })
  //             : String(group[column.key] ?? '')}
  //         </div>
  //       ))}
  //     </div>
  //   )

  const handleGroupRegister = () => {
    router.push('/group/create')
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <Typo16>그룹등록 및 그룹 정보 조회</Typo16>
        </h1>
        <ButtonGroupRegister text="그룹등록" styles={styles} onClick={handleGroupRegister} />
      </div>

      <GroupSearchSection
        groupTypeValue={searchParams.groupType}
        statusValue={searchParams.status}
        searchKeyword={searchParams.keyword}
        groupTypeOptions={GROUP_TYPE_OPTIONS}
        statusOptions={STATUS_OPTIONS}
        onGroupTypeChange={onGroupTypeChange}
        onStatusChange={onStatusChange}
        onSearchChange={onSearchChange}
        placeholder="그룹명, 소속위치, 관리코드를 검색합니다."
      />

      <div className={styles.table}>
        {renderTableHeader()}
        <div className={styles.tableBody}>{filteredGroupList.map(renderTableRow)}</div>
      </div>

      <div className={styles.footer}>
        <Button className={styles.downloadButton} onClick={onExcelDownload}>
          <Image src="/images/group/group_excel.png" alt="excel" width={16} height={16} />
          엑셀 다운로드
        </Button>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          onPageLoad={async () => Promise.resolve()}
        />
        <div className={styles.groupCount}>그룹 : {totalCount}</div>
      </div>
    </div>
  )
}

export default GroupView
