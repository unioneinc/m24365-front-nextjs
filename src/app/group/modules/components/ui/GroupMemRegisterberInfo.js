import React from 'react'
import styles from '@/app/group/modules/styles/member-register-info.module.scss'
import { Button, Select, MenuItem, IconButton } from '@mui/material'
import { Typo14 } from '@/app/ui/misc/Typo'
import InfoIcon from '@mui/icons-material/Info'
import { CODE_NAME, GROUP, MEMBER } from '@/constants'
const { GROUP_TYPE, GROUP_REGION, GROUP_MEMBER_DUTY_TYPE, GROUP_MEMBER_STATUS } = GROUP
const { AUTHORITY_LEVEL } = MEMBER

const GroupMemberRegisterInfo = ({ isOpen, onClose, onSubmit, memberData }) => {
  const [role, setRole] = React.useState(memberData.role)

  const handleRoleChange = (event) => {
    setRole(event.target.value)
  }

  const handleSave = () => {
    if (onSubmit) {
      onSubmit({ ...memberData, role })
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typo14 color="#FDFDFD">회원 정보</Typo14>
        <div className={styles.closeIcon} onClick={onClose} />
      </div>

      <div className={styles.content}>
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.label}>아이디</div>
            <div className={styles.value}>{memberData.id}</div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>성명</div>
            <div className={styles.value}>{memberData.name}</div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>연락처</div>
            <div className={`${styles.value} ${styles.link}`}>{memberData.phone}</div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>이메일</div>
            <div className={styles.value}>{memberData.email}</div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>담당업무</div>
            <div className={styles.roleSelect}>
              <div className={styles.selectWrapper}>
                <Select
                  value={role}
                  onChange={handleRoleChange}
                  fullWidth
                  size="small"
                  sx={{
                    '& .MuiSelect-select': {
                      padding: '8px 15px'
                    }
                  }}
                >
                  {Object.entries(GROUP_MEMBER_DUTY_TYPE).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                      {CODE_NAME[value]}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <IconButton size="small">
                <InfoIcon sx={{ width: 14, height: 14, color: '#DCDCDC' }} />
              </IconButton>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Button
            variant="outlined"
            sx={{
              minWidth: '56px',
              color: '#424242',
              borderColor: '#DCDCDC',
              '&:hover': {
                borderColor: '#DCDCDC',
                backgroundColor: 'transparent'
              }
            }}
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            variant="contained"
            sx={{
              minWidth: '56px',
              marginLeft: '8px',
              backgroundColor: '#69A7E4',
              '&:hover': {
                backgroundColor: '#5B96D1'
              }
            }}
            onClick={handleSave}
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GroupMemberRegisterInfo
