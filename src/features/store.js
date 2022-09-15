import { configureStore } from "@reduxjs/toolkit";
import InfoSlice from './infoSlice/infoSlice'
const store = configureStore({
  reducer:{
    info: InfoSlice
  }
})
export default store