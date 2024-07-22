import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { IoLogoGameControllerA } from "react-icons/io";
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='topSideBar'><IoLogoGameControllerA className='topSideBar__icon'/></div>
    <App/>
  </React.StrictMode>,
)