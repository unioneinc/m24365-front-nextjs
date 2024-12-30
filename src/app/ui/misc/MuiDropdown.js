'use client'

import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp'

export default function MuiButtonDropdown({
  options,
  defaultLabel = 'Select',
  onChange,
  bgColor = '#FFFFFF'
}) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [selectedOption, setSelectedOption] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (option) => {
    setSelectedOption(option)
    handleClose()
    if (onChange) {
      onChange(option.value)
    }
  }

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownSharpIcon color="primary" />}
        color="inherit"
        size="small"
        style={{ backgroundColor: bgColor }}
      >
        {selectedOption ? selectedOption.label : defaultLabel}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{ style: { backgroundColor: bgColor } }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleMenuItemClick(option)}
            selected={selectedOption?.value === option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
