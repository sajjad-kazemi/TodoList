import { createTheme,ThemeProvider } from '@mui/material/styles'
import Loading from './components/Loading/Loading'
import {Box} from '@mui/material'
import {Container} from '@mui/material'
import useLocalstorage from './hooks/useLocalstorage'
import {useEffect, Suspense} from 'react'
import {useDispatch} from 'react-redux'
import {fetchTodoList} from './features/infoSlice/infoSlice'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Navbar from './components/Navbar/Navbar'
import Body from './components/Body/Body'

const translationEn = {
  todoTitle:'Todo List',
  addAction:'Add',
  placeHolder:'i want to do ...',
  doneAll:'Done All',
  clearHistory:'Clear History',
  deleteAll:'Delete All',
}
const translationFa = {
  todoTitle:'لیست کارها',
  addAction:'اضافه کردن',
  placeHolder:'توضیح کار من ...',
  doneAll:'انجام همه',
  clearHistory:'پاک کردن تاریخچه',
  deleteAll:'حذف همه',
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    supportedLngs:['en','fa'],
    resources:{
      en:{translation:translationEn},
      fa:{translation:translationFa}
    },
    fallbackLng:'en',
    interpolation:{escapeValue:false},
    detection:{
      order:['localStorage','htmlTag','cookie']
    }
  })

const theme ={
  light:createTheme({
    palette:{
      primary:{
        main:'#2241AA',
        secondary:'#72E1D1',
        negative:'#89A7A7'
      },
      secondary:{
        main:'#d8d8d8',
        secondary:'#ffffff',
        negative:'#a0a0a0'
      },
      text:{
        main:'#000000',
        secondary:'#cccccc',
        negative:'#ffffff'
      },
      bg:{
        main:'#ffffff',
        secondary:'#eeeeee',
        negative:'#000000',
      },
      custom:{
        switchbg:'#d4fffe',
        switchthumb:'#ffffff',
        switchicon:'rgb(0,0,0)'
      },
      colorList:{
        1:'#11abbb',
        2:'#2ffaab',
        3:'#aa6666',
        4:'#aaaa31',
        5:'#ffaccc'
      }
    }
  }),
  dark:createTheme({
    palette:{
      mode:'dark',
      primary:{
        main:'#34353b',
        secondary:'#202124',
        negative:'#3d3f45'
      },
      secondary:{
        main:'#9a63e2',
        secondary:'#7e53b0',
        negative:'#dabaff'
      },
      text:{
        main:'#fff',
        secondary:'#bbb',
        negative:'#000'
      },
      bg:{
        main:'#ddd',
        secondary:'#aaa',
        negative:'#fff',
      },
      custom:{
        switchbg:'#000',
        switchthumb:'#eee',
        switchicon:'rgb(0,0,0)'
      },
      colorList:{
        1:'#11abbb',
        2:'#2ffaab',
        3:'#aa6666',
        4:'#aaaa31',
        5:'#ffaccc'
      }
    }
  })
}
export const languages = [
  {
    name:'English',
    code:'en',
    dir:'ltr',
    flag:'gb'
  },
  {
    name:'فارسی',
    code:'fa',
    dir:'rtl',
    flag:'ir'
  }
]
function App() {
  const [localTheme,setLocalTheme] = useLocalstorage('theme','light')
  const dispatch = useDispatch()
  useEffect(()=>{
    let isMounted = true
    if(isMounted){
      dispatch(fetchTodoList())
    }
    return () => {
      isMounted = false;
    }
  },[dispatch])
  return (
    <Suspense fallback={<Container fixed sx={{width:'100vw',height:'100vh'}}><Loading/></Container>}>
      <ThemeProvider theme={theme[localTheme]||'dark'}>
      <Box component='main' sx={{bgcolor:(localTheme === 'dark' && 'primary.main') || 'secondary.secondary',minHeight:'100vh'}}>
        <Navbar setTheme={setLocalTheme} Theme={localTheme}/>
        <Body/>
      </Box>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
