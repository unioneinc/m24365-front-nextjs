import React from 'react'

const Typographyh4Regular = ({ className = '', pxRegular }) => {
  return (
    <div
      className={`w-[9.375rem] h-[0.875rem] flex flex-row items-start justify-start text-left text-[0.875rem] text-black font-body-h6-regular ${className}`}
    >
      <div className="h-[0.875rem] w-[8.813rem] relative tracking-[-0.02em] leading-[0.875rem] font-medium flex items-center overflow-hidden text-ellipsis whitespace-nowrap shrink-0">
        {pxRegular}
      </div>
    </div>
  )
}

export default Typographyh4Regular
