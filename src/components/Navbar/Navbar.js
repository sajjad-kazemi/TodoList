import {FormControl, FormControlLabel, Select, MenuItem, Box, AppBar, Switch, Typography} from '@mui/material'
import { useTranslation } from 'react-i18next'
import {languages} from '../../App'
import {changeLanguage} from 'i18next'
import { useState,useEffect } from 'react'
import {styled} from '@mui/material/styles'

const MuiSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${theme.palette.custom.switchicon}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.custom.switchbg,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.custom.switchthumb,
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${theme.palette.custom.switchicon}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.custom.switchbg,
    borderRadius: 20 / 2,
  },
}));

function Navbar({Theme,setTheme}) {
  const {t} = useTranslation()
  const [currLang, setCurrLang] = useState(()=>localStorage.getItem('i18nextLng'));
  const darkTheme = (Theme === 'dark')
  useEffect(() => {
    const {dir} = languages.find(item=>item.code === currLang)
    document.body.dir = dir
    changeLanguage(currLang)
    document.title = t('todoTitle')
  }, [currLang]);
  const handleLangChange = (e)=>{
    const {value} = e.target
    setCurrLang(value)
  }
  const handleThemeChange = ()=>{
    if (Theme === 'dark'){
      setTheme('light')
    } else{
      setTheme('dark')
    }
  } 
  return (
    <Box sx={{position:'sticky',top:0,zIndex:'10'}}>
      <AppBar sx={{position:'inherit',bgcolor:'primary.light',boxShadow:'none',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
        <FormControl sx={{m:1}}>
          <Select sx={{color:'text.main',px:1,bgcolor:'primary.light','& svg':{color:'secondary.dark'}}} value={currLang} onChange={handleLangChange}>
            {languages.map((lang)=>(
              <MenuItem sx={{justifyContent:'space-between','&:hover':{bgcolor:'secondary.light'},'& span':{mx:1}}} key={lang.code} value={lang.code}>
                <span className={`fi fi-${lang.flag}`}></span>
                <span>{'\t'+lang.name}</span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant='h4' sx={{color:'secondary.main',fontFamily:"'Titan one', cursive , 'Lateef', cursive",fontWeight:'700',textShadow:Theme==='light' && '0 -2px 2px black',justifySelf:'center',m:'auto',userSelect:'none',display:{xs:'none',sm:'inline'}}}>
          {t('todoTitle')}
        </Typography>
        <FormControlLabel control={<MuiSwitch sx={{my:'auto',mx:7}} checked={darkTheme} onChange={handleThemeChange}/>} />
        
      </AppBar>
    </Box>
  )
}

export default Navbar