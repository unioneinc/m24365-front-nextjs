import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button, Menu, MenuItem } from '@mui/material'
import styles from './customcomponents.module.scss'

export const CustomDropdownButton = ({ label, menuList }) => {
  const [groupType, setGroupType] = useState(label)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (value) => {
    setGroupType(value)
    handleClose()
  }

  useEffect(() => {
    setGroupType(menuList.length === 0 ? '' : menuList[0])
  }, [menuList])

  return (
    <div className={styles.dropdown}>
      <label className={styles.label}>그룹유형</label>
      <Button
        onClick={handleClick}
        className={styles.select}
        sx={{
          justifyContent: 'space-between',
          padding: '10px 15px',
          textTransform: 'none',
          color: 'inherit',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }}
        endIcon={
          <Image src="/images/group_arrow_down.png" alt="arrow-down" width={16} height={16} />
        }
        fullWidth
      >
        <span className={styles.selectText}>{groupType}</span>
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
        {menuList.map((item, index) => (
          <MenuItem key={index} onClick={() => handleMenuItemClick(item)}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export const ButtonServiceSubmit = ({
  text,
  backgroundColor = 'transparent',
  size = 'medium',
  ...props
}) => {
  return (
    <Button
      className={styles.buttonServiceSubmit}
      disableElevation
      {...props}
      sx={{ backgroundColor }}
      size={size}
    >
      <div className={styles.iconElementPlusB}>
        <Image src="/images/group_register.png" alt="group-register" width={16} height={16} />
      </div>
      <span className={styles.buttonText}>{text}</span>
    </Button>
  )
}
