import React from 'react'
import './Layout.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout