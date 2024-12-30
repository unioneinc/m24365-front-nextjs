import Image from 'next/image'
import { Button } from '@mui/material'

export const ButtonGroupRegister = ({
  text,
  backgroundColor = 'transparent',
  size = 'medium',
  styles,
  onClick,
  ...props
}) => {
  return (
    <Button
      className={styles.registerButton}
      disableElevation
      onClick={onClick}
      {...props}
      sx={{ backgroundColor }}
      size={size}
    >
      <div className={styles.icon}>
        <Image src="/images/icon/add.png" alt="group-register" width={16} height={16} />
      </div>
      <span>{text}</span>
    </Button>
  )
}
