'use client'

import React, { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Paper,
  Divider
} from '@mui/material'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '800px',
    maxWidth: '90vw'
  }
}))

const PreviewBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(2)
}))

const ExcelDownload = ({ onClose, onSubmit }) => {
  const [selectedItems, setSelectedItems] = useState(['아이디', '성명', '그룹명'])
  const [unselectedItems, setUnselectedItems] = useState(['소속지역', '관리코드'])

  console.log('ExcelDownload 컴포넌트 렌더링')

  useEffect(() => {
    console.log('ExcelDownload 컴포넌트 마운트')
    return () => {
      console.log('ExcelDownload 컴포넌트 언마운트')
    }
  }, [])

  const handleItemToggle = (item, isSelected) => {
    if (isSelected) {
      setSelectedItems(selectedItems.filter((i) => i !== item))
      setUnselectedItems([...unselectedItems, item])
    } else {
      setUnselectedItems(unselectedItems.filter((i) => i !== item))
      setSelectedItems([...selectedItems, item])
    }
  }

  const handleClose = useCallback(() => {
    console.log('모달 닫기 시도')
    onClose()
  }, [onClose])

  const handleSave = useCallback(() => {
    console.log('저장 시도', selectedItems)
    onSubmit(selectedItems)
  }, [onSubmit, selectedItems])

  const handleMoveItem = (item, direction) => {
    const index = selectedItems.indexOf(item)
    if (index === -1) return

    const newItems = [...selectedItems]
    if (direction === 'up' && index > 0) {
      ;[newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]]
    } else if (direction === 'down' && index < selectedItems.length - 1) {
      ;[newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]]
    }
    setSelectedItems(newItems)
  }

  return (
    <StyledDialog open onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">엑셀 다운로드 편집기</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom>
            사용방법
          </Typography>
          <Paper elevation={0} variant="outlined" sx={{ p: 2 }}>
            <Typography variant="body2">
              • 체크 박스로 [ + - ↑ ↓ 버튼 ]을 사용해 항목을 조작합니다.
            </Typography>
            <Typography variant="body2">
              • [ 선택 항목 ]에서 체크한 항목을 [ - 버튼 ]을 눌러 출력에서 제외시킵니다.
            </Typography>
            <Typography variant="body2">
              • [ 미선택 항목 ]에서 체크한 항목을 [ + 버튼 ]을 눌러 출력에 포함시킵니다.
            </Typography>
            <Typography variant="body2">
              • [ 선택 항목 ]에서 체크한 항목을 [ ↑ ↓ 버튼 ]으로 출력 순서를 수정합니다.
            </Typography>
            <Typography variant="body2">
              • [ 미선택 항목 ]은 순서 및 체크 여부에 상관없이 출력에서 제외됩니다.
            </Typography>
            <Typography variant="body2">
              • [ 선택 항목 ]의 순서대로 [ 선택 항목 출력 미리보기 ]와 동일하게 출력됩니다.
            </Typography>
          </Paper>
        </Box>

        <Box display="flex" gap={2}>
          <Box flex={1}>
            <Typography variant="subtitle2" gutterBottom>
              미선택 항목
            </Typography>
            <List>
              {unselectedItems.map((item) => (
                <ListItem key={item} dense button onClick={() => handleItemToggle(item, false)}>
                  <ListItemIcon>
                    <Checkbox edge="start" checked={false} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box display="flex" flexDirection="column" justifyContent="center" gap={1}>
            <IconButton
              onClick={() =>
                unselectedItems.length > 0 && handleItemToggle(unselectedItems[0], false)
              }
            >
              <AddIcon />
            </IconButton>
            <IconButton
              onClick={() => selectedItems.length > 0 && handleMoveItem(selectedItems[0], 'up')}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                selectedItems.length > 0 &&
                handleMoveItem(selectedItems[selectedItems.length - 1], 'down')
              }
            >
              <KeyboardArrowDownIcon />
            </IconButton>
            <IconButton
              onClick={() => selectedItems.length > 0 && handleItemToggle(selectedItems[0], true)}
            >
              <RemoveIcon />
            </IconButton>
          </Box>

          <Box flex={1}>
            <Typography variant="subtitle2" gutterBottom>
              선택 항목
            </Typography>
            <List>
              {selectedItems.map((item) => (
                <ListItem key={item} dense button onClick={() => handleItemToggle(item, true)}>
                  <ListItemIcon>
                    <Checkbox edge="start" checked={true} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>

        <Box mt={3}>
          <Typography variant="subtitle2" gutterBottom>
            선택 항목 출력 미리보기
          </Typography>
          <PreviewBox>
            <Box display="flex" alignItems="center" gap={1}>
              {selectedItems.map((item, index) => (
                <React.Fragment key={item}>
                  <Typography variant="body2">{item}</Typography>
                  {index < selectedItems.length - 1 && <Divider orientation="vertical" flexItem />}
                </React.Fragment>
              ))}
            </Box>
          </PreviewBox>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          취소
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          저장
        </Button>
      </DialogActions>
    </StyledDialog>
  )
}

export default ExcelDownload
