import React from 'react'
import ReactDOM from 'react-dom/client'
import Pie from './Pie.jsx'
import TotalPie from './TotalPie.jsx'
import Header from './Header.jsx'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <TotalPie />
    <Pie />
  </React.StrictMode>,
)
