'use client'

import React, { useState } from 'react'
import styles from './customdropdown.module.scss'
import Image from 'next/image'
import { Menu, MenuItem } from '@mui/material'
import { Typo14 } from '@/app/ui/misc/Typo'
import Button from '@mui/material/Button'

const CustomDropdown = ({ label, value, options, onChange, showLabel = true }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    const target = event.currentTarget
    if (target instanceof HTMLElement) {
      setAnchorEl(target)
    }
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
      {showLabel && <Typo14 className={styles.label}>{label}</Typo14>}
      <Button
        className={styles.select}
        onClick={(event) => handleClick(event)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 0,
          minWidth: 'auto',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'transparent'
          },
          textTransform: 'none'
        }}
      >
        <span>{value || label}</span>
        <Image
          src="/images/group_arrow_down.png"
          alt="arrow-down"
          width={16}
          height={16}
          className={styles.icon}
        />
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
      >
        {options?.map((option) => (
          <MenuItem key={option} onClick={() => handleSelect(option)}>
            <Typo14>{option}</Typo14>
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default CustomDropdown
