import React from 'react'

const StateuserpasswordNomal = ({ className = '' }) => {
  return (
    <div
      className={`w-[29.625rem] h-[2.5rem] flex flex-row items-start justify-start pt-[0.687rem] px-[1.187rem] pb-[0.625rem] box-border relative ${className}`}
    >
      <div className="h-full w-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded-3xs bg-white border-grey-scale-dark-grey border-[1px] border-solid box-border" />
      <input
        className="w-[24.581rem] [border:none] [outline:none] font-body-h6-regular text-[0.875rem] bg-[transparent] h-[1.188rem] relative leading-[0.875rem] text-grey-scale-dark-grey text-left flex items-center overflow-hidden text-ellipsis whitespace-nowrap z-[1]"
        placeholder="비밀번호를 입력하세요"
        type="text"
      />
    </div>
  )
}

export default StateuserpasswordNomal
