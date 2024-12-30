// @/components/common/Search.tsx
import React from 'react'
import Image from 'next/image'
import styles from '@/app/group/modules/styles/search.module.scss'
import { fpFlow } from '@/utils/lodashUtils'
import { CustomDropdown } from '@/paths'
import { Typo14 } from '@/app/ui/misc/Typo'

export const GroupSearchSection = ({
  groupTypeValue,
  statusValue,
  searchKeyword,
  groupTypeOptions,
  statusOptions,
  onGroupTypeChange,
  onStatusChange,
  onSearchChange,
  placeholder = '검색어를 입력하세요.'
}) => {
  // 검색어 변경 핸들러
  const handleSearchChange = fpFlow([(e) => e.target.value, onSearchChange])

  return (
    <div className={styles.searchContainer}>
      <div className={styles.dropdown}>
        <CustomDropdown
          label="그룹유형"
          value={groupTypeValue}
          options={groupTypeOptions.map((opt) => opt.label)}
          onChange={onGroupTypeChange}
        />
      </div>
      <div className={styles.dropdown}>
        <CustomDropdown
          label="상태"
          value={statusValue}
          options={statusOptions.map((opt) => opt.label)}
          onChange={onStatusChange}
        />
      </div>
      <div className={styles.searchField}>
        <label className={styles.label}>
          <Typo14>키워드 검색</Typo14>
        </label>
        <div className={styles.input}>
          <input
            type="text"
            placeholder={placeholder}
            value={searchKeyword}
            onChange={handleSearchChange}
          />
          <Image src="/images/group_search.png" alt="search" width={16} height={16} />
        </div>
      </div>
    </div>
  )
}

export default GroupSearchSection
