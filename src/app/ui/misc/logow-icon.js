import Image from 'next/image'

const LogowIcon = ({ className = '' }) => {
  return (
    <div className={`w-[11.25rem] h-[2.306rem] relative object-cover shrink-0 z-[1] ${className}`}>
      <Image src="/images/login/logo.png" alt="logo" width={53} height={50} />
    </div>
  )
}

export default LogowIcon
