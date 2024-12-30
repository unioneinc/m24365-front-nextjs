import React from 'react'

const StateuseridNomal = ({ className = '' }) => {
  return (
    <div
      className={`w-[29.625rem] h-[2.5rem] flex flex-row items-center justify-start py-[0.5rem] px-[0.875rem] box-border relative ${className}`}
    >
      <div className="h-full w-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded-3xs bg-white border-grey-scale-dark-grey border-[1px] border-solid box-border" />
      <input
        className="w-full [border:none] [outline:none] font-body-h6-regular text-[0.875rem] bg-[transparent] h-full relative leading-[1.25] text-grey-scale-dark-grey text-left flex items-center overflow-hidden text-ellipsis whitespace-nowrap z-[1]"
        placeholder="아이디를 입력하세요"
        type="text"
      />
    </div>
  )
}

export default StateuseridNomal
