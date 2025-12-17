import React from 'react'
import './LeftComponent.css'

import { SiOpenai } from "react-icons/si";
import { IoCloseSharp } from "react-icons/io5";

export const LeftNavbar = ()=> {
  return (
    <nav className="nav-icon-container">
        <div className="gpt-icon"><SiOpenai /></div>
        <div className="close-icon"><IoCloseSharp /></div>
    </nav>
  )
}

export default LeftNavbar

