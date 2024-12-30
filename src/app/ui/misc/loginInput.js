import React from 'react'
import Typographyh4Regular from './typographyh4-regular'
import StateuseridNomal from './stateuserid-nomal'

const LoginInput = ({ className = '', pxRegular }) => {
  return (
    <div
      className={`w-[29.625rem] h-[4rem] flex flex-col items-start justify-start gap-[0.625rem] ${className}`}
    >
      <Typographyh4Regular pxRegular={pxRegular} />
      <StateuseridNomal />
    </div>
  )
}

export default LoginInput
