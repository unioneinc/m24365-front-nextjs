import React from 'react'

export const Typo16 = ({ children, color = '#424242', className, style }) => {
  return (
    <span
      className={className}
      style={{
        color,
        fontSize: '16px',
        fontFamily: 'Noto Sans KR, sans-serif',
        fontWeight: 500,
        lineHeight: 1.2,
        wordWrap: 'break-word',
        textTransform: 'none',
        ...style
      }}
    >
      {children}
    </span>
  )
}

export const Typo14 = ({ children, color = '#424242', className, style }) => {
  return (
    <span
      className={className}
      style={{
        color,
        fontSize: '14px',
        fontFamily: 'Noto Sans KR, sans-serif',
        fontWeight: 400,
        lineHeight: 1,
        wordWrap: 'break-word',
        textTransform: 'none',
        ...style
      }}
    >
      {children}
    </span>
  )
}
