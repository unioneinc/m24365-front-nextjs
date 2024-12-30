'use client'

import React, { useState, useEffect } from 'react'
import styles from './member-invite.module.scss'
import Button from '@mui/material/Button'
import { Typo14 } from '@/app/ui/misc/Typo'
import Image from 'next/image'
import { X as CloseIcon } from 'lucide-react'
// import { postGroupInviteMemberFilter } from '@/app/actions/v2/group'
import { useStore } from '@/stores/storeZustand'

const MemberInvite = ({ isOpen, onClose, onSubmit, existingMembers = [] }) => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [members, setMembers] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState([])
  const myInfo = useStore((state) => state.myInfo)

  useEffect(() => {
    if (isOpen) {
      const fetchMembers = async () => {
        try {
          setLoading(true)
          const searchParams = {
            orderType: 'DESC',
            page: {
              page: currentPage - 1,
              size: 10
            },
            search: {
              keyword: searchKeyword || ''
            }
          }

          const response = await postGroupInviteMemberFilter(searchParams)
          const existingMbrNos = new Set(existingMembers.map((m) => m.id))

          const formattedMembers = response.items
            .filter((member) => !existingMbrNos.has(member.mbrNo.toString()))
            .map((member) => ({
              id: member.mbrNo.toString(),
              username: member.mbrId,
              name: member.mbrNm,
              phone: member.mbrCell,
              email: member.mbrEmail,
              role: member.mgrTyCd || '-',
              isSelected: false
            }))

          setMembers(formattedMembers)
          setTotalCount(response.totalCount)
          setTotalPages(response.totalPages)
        } catch (error) {
          console.error('멤버 목록 조회 실패:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchMembers()
    }
  }, [isOpen, currentPage, searchKeyword, existingMembers])

  const handleSelectAll = () => {
    setMembers((prev) => prev.map((member) => ({ ...member, isSelected: true })))
  }

  const handleToggleMember = (id) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, isSelected: !member.isSelected } : member
      )
    )
  }

  const handleConfirm = () => {
    const selectedMembers = members.filter((member) => member.isSelected)
    if (selectedMembers.length > 0) {
      onSubmit(selectedMembers)
    }
    onClose()
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const renderTableHeader = () => (
    <div className={styles.tableHeader}>
      <div className={styles.checkbox} onClick={handleSelectAll}>
        <div className={styles.checkIcon} />
      </div>
      <Typo14 className={styles.id}>아이디</Typo14>
      <Typo14 className={styles.name}>성명</Typo14>
      <Typo14 className={styles.phone}>연락처</Typo14>
      <Typo14 className={styles.email}>이메일</Typo14>
      <Typo14 className={styles.role}>담당업무</Typo14>
    </div>
  )

  const renderTableRow = (member) => (
    <div
      key={member.id}
      className={`${styles.tableRow} ${member.isSelected ? styles.selected : ''}`}
      onClick={() => handleToggleMember(member.id)}
    >
      <div className={`${styles.checkbox} ${member.isSelected ? styles.checked : ''}`}>
        <div className={styles.checkIcon} />
      </div>
      <Typo14 className={styles.id}>{member.username}</Typo14>
      <Typo14 className={styles.name}>{member.name}</Typo14>
      <Typo14 className={styles.phone}>{member.phone}</Typo14>
      <Typo14 className={styles.email}>{member.email}</Typo14>
      <Typo14 className={styles.role}>{member.role}</Typo14>
    </div>
  )

  const renderPagination = () => {
    if (totalPages <= 1) {
      return null
    }

    const pageGroupSize = 5
    const currentGroup = Math.ceil(currentPage / pageGroupSize)
    const startPage = Math.max(1, (currentGroup - 1) * pageGroupSize + 1)
    const endPage = Math.min(startPage + pageGroupSize - 1, totalPages)

    const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

    return (
      <div className={styles.pagination}>
        <div className={styles.pageControls}>
          <Button
            className={styles.control}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            sx={{ opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            &lt;&lt;
          </Button>
          <Button
            className={styles.control}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            sx={{ opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            &lt;
          </Button>
        </div>
        <div className={styles.pageNumbers}>
          {visiblePages.map((page) => (
            <Button
              key={page}
              className={`${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
              onClick={() => handlePageChange(page)}
              variant={currentPage === page ? 'contained' : 'outlined'}
              sx={{
                minWidth: '24px',
                padding: '0',
                borderRadius: '8px',
                color: currentPage === page ? '#FFFFFF' : '#424242',
                backgroundColor: currentPage === page ? '#878787' : '#FDFDFD',
                '&:hover': {
                  backgroundColor: currentPage === page ? '#878787' : '#F5F5F5'
                }
              }}
            >
              {page}
            </Button>
          ))}
        </div>
        <div className={styles.pageControls}>
          <Button
            className={styles.control}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            sx={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            &gt;
          </Button>
          <Button
            className={styles.control}
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            sx={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            &gt;&gt;
          </Button>
        </div>
      </div>
    )
  }

  if (!isOpen) return null

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <Typo14 color="#FDFDFD">회원 선택</Typo14>
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon size={16} color="#FDFDFD" />
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="아이디, 성명, 전화번호, 이메일을 검색하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <Image src="/images/search.png" alt="search" width={16} height={16} />
        </div>

        <div className={styles.table}>
          {renderTableHeader()}
          <div className={styles.tableBody}>
            {loading ? (
              <div className={styles.loading}>Loading...</div>
            ) : (
              members.map(renderTableRow)
            )}
          </div>
        </div>

        {renderPagination()}

        <div className={styles.buttonGroup}>
          <Button
            variant="outlined"
            className={styles.cancelButton}
            onClick={onClose}
            sx={{
              color: '#424242',
              borderColor: '#DCDCDC',
              '&:hover': {
                borderColor: '#BEBEBE'
              }
            }}
          >
            <Typo14>취소</Typo14>
          </Button>
          <Button
            variant="contained"
            className={styles.confirmButton}
            onClick={handleConfirm}
            sx={{
              backgroundColor: '#273168',
              '&:hover': {
                backgroundColor: '#1e254f'
              }
            }}
          >
            <Typo14 color="#FDFDFD">확인</Typo14>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MemberInvite
