import { Button } from '@mui/material'

const Buttontext = ({ className = '', onClick }) => {
  return (
    <Button
      onClick={onClick}
      className={`w-[29.625rem] h-[2.5rem] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] ${className}`}
      variant="contained"
      sx={{
        textTransform: 'none',
        color: '#fdfdfd',
        fontSize: '14',
        background: '#273168',
        borderRadius: '10px',
        '&:hover': { background: '#273168' },
        width: 474,
        height: 40
      }}
    >
      로그인
    </Button>
  )
}

export default Buttontext
