import {Select, MenuItem,Box} from '@mui/material'
import {changeColor} from '../../features/infoSlice/infoSlice'
import {useDispatch} from 'react-redux'
import {useTranslation} from 'react-i18next'


function ColorList({Item}) {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const {id,color} = Item
  const handleColorChange = (e)=>{
    dispatch(changeColor({id,color:e.target.value}))
  }
  return (
    <>
      <Select title={t('changeColor')} size='small' value={color} onChange={handleColorChange} sx={{cursor:'default',p:0,alignItems:'center','.MuiOutlinedInput-notchedOutline':{display:'none'},'& svg':{display:'none'},'& input':{display:'none'},'&>div':{p:'0 !important',display:'flex',justifyContent:'center',alignItems:'center','&>div':{p:0}}}}>
        {[...Array(5)].map((_,index)=>(
          <MenuItem disabled={color === `colorList.${index+1}`} key={index} value={`colorList.${index+1}`}>
            <Box sx={{border:'2px solid gray',borderColor:'text.main',borderRadius:'5px',bgcolor:`colorList.${index+1}`,width:20,height:20}}></Box>
          </MenuItem>
        ))}
      </Select>
    </>
  )
}

export default ColorList