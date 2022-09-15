import { createTheme,ThemeProvider } from '@mui/material/styles'
import Loading from './components/Loading/Loading'
import {Container} from '@mui/material'
import useLocalstorage from './hooks/useLocalstorage'
import {useEffect, Suspense} from 'react'
import {useDispatch} from 'react-redux'
import {getTodoList} from './features/infoSlice/infoSlice'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Navbar from './components/Navbar/Navbar'
import Body from './components/Body/Body'

const translationEn = {
  todoTitle:'Todo List',
  addAction:'Add',
  placeHolder:'i want to do ...'
}
const translationFa = {
  todoTitle:'لیست کارها',
  addAction:'اضافه کردن',
  placeHolder:'توضیح کار من ...',
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
        light:'#72E1D1',
        dark:'#89A7A7'
      },
      secondary:{
        main:'#ffffff',
        light:'#A09BE7',
        dark:'#50514F'
      },
      text:{
        main:'#000',
        secondary:'#ccc',
        negative:'#fff'
      },
      custom:{
        switchbg:'#d4fffe',
        switchthumb:'#fff',
        switchicon:'rgb(0,0,0)'
      }
    }
  }),
  dark:createTheme({
    palette:{
      primary:{
        main:'#34353b',
        light:'#3d3f45',
        dark:'#202124'
      },
      secondary:{
        main:'#C38FFF',
        light:'#dabaff',
        dark:'#7e53b0'
      },
      text:{
        main:'#fff',
        secondary:'#bbb',
        negative:'#000'
      },
      custom:{
        switchbg:'#000',
        switchthumb:'#eee',
        switchicon:'rgb(0,0,0)'
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
  const [localTheme,setLocalTheme] = useLocalstorage('theme','dark')
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getTodoList())
  },[dispatch])
  return (
    <Suspense fallback={<Container sx={{width:'100vw',height:'100vh'}}><Loading/></Container>}>
      <ThemeProvider theme={theme[localTheme]}>
      <Navbar setTheme={setLocalTheme} Theme={localTheme}/>
      <Body/>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
