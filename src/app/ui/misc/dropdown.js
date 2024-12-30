import React from 'react'
import Select from 'react-select'

export const DashboardDropdown = ({ text }) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return (
    <div
      className="custom-dropdown"
      style={{
        width: '100%',
        height: '100%',
        padding: '8px 15px',
        background: '#FDFDFD',
        borderRadius: 10,
        border: '1px #DCDCDC solid',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <Select options={options} />
      <div
        className="dropdown-arrow"
        style={{
          width: 16,
          height: 16,
          position: 'absolute',
          right: 15,
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <div
          style={{
            width: 8,
            height: 4.31,
            position: 'absolute',
            left: 4,
            top: 6,
            border: '1.50px #69A7E4 solid',
            borderTop: 'none',
            borderLeft: 'none',
            transform: 'rotate(45deg)'
          }}
        />
      </div>
    </div>
  )
}

const globalStyles = `
  .custom-dropdown select {
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
  }

  .custom-dropdown select::-ms-expand {
    display: none;
  }
`

const styleSheet = document.createElement('style')
styleSheet.innerText = globalStyles
document.head.appendChild(styleSheet)
