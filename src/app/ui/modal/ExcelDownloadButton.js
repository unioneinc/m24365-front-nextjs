import React from 'react'
import { useModal } from '@/features/modal'
import ExcelDownload from './ExcelDownload'
import { Button, styled } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  },
  padding: theme.spacing(1, 2),
  textTransform: 'none'
}))

const ExcelDownloadButton = () => {
  const { openModal } = useModal()

  const handleOpenExcelDownload = async () => {
    try {
      console.log('엑셀 다운로드 버튼 클릭')
      const result = await openModal({
        component: ExcelDownload,
        props: {}
      })
      console.log('Selected items for Excel download:', result)
    } catch (error) {
      console.log('Excel download modal was closed or encountered an error:', error)
    }
  }

  return (
    <StyledButton
      variant="contained"
      startIcon={<DownloadIcon />}
      onClick={handleOpenExcelDownload}
    >
      Excel 다운로드
    </StyledButton>
  )
}

export default ExcelDownloadButton
