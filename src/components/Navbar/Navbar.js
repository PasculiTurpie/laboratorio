import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="administration">Administración</Link>
      <Link to="dashboard">Dashboard</Link>
    </div>
  );
}

export default Navbar