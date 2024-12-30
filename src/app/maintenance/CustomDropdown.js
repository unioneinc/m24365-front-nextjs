// src/app/maintenance/CustomDropdown.js

'use client'

import React, { useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import Image from 'next/image'
import { Typo14 } from '@/paths'
import styles from './maintenance.module.scss'

const CustomDropdown = ({ label, value, options, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelect = (option) => {
    onChange(option)
    handleClose()
  }

  return (
    <div className={styles.dropdown}>
      <Typo14>{label}</Typo14>
      <Button
        onClick={handleClick}
        className={styles.select}
        sx={{
          justifyContent: 'space-between',
          padding: '8px 15px',
          textTransform: 'none',
          color: 'inherit',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }}
        endIcon={<Image src="/images/arrow_down.png" alt="arrow" width={16} height={16} />}
        fullWidth
      >
        <span>{value}</span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              width: anchorEl ? anchorEl.offsetWidth : undefined
            }
          }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleSelect(option)}
            sx={{
              fontSize: '14px',
              fontFamily: 'Noto Sans KR, sans-serif',
              color: '#424242'
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default CustomDropdown
