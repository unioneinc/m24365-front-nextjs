import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

// CustomButton 컴포넌트 생성
export const CustomButton = styled(Button)(({ backgroundImage }) => ({
  backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  '&:hover': {
    opacity: 0.8
  }
}))

export const ColorButton = styled(Button)(({ backgroundColor }) => ({
  backgroundColor: backgroundColor || 'transparent',
  color: 'white',
  '&:hover': {
    opacity: 0.8,
    backgroundColor: backgroundColor || 'transparent' // hover 시에도 같은 색상 유지
  }
}))

export const MuiButtons = () => {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <CustomButton variant="contained" backgroundImage="/images/to/your/image.jpg">
        Custom Button
      </CustomButton>
    </Stack>
  )
}

export default MuiButtons
