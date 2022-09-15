import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import store from './features/store'
import {Provider} from 'react-redux'
import 'flag-icons/css/flag-icons.min.css'
import CssBaseline from '@mui/material/CssBaseline'
import './index.css'
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
    <CssBaseline/>
      <App />
    </StrictMode>
  </Provider>
);
