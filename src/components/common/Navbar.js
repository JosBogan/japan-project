import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Auth from '../../lib/Auth'

const Navbar = () => (

  <nav className="navbar">
    <ul className="nav_container">
      <Link className="nav_link" to="/destinations"><li>Destinations</li></Link>
      {!Auth.isAuthenticated() && <Link className="nav_link" to="/login"><li>Login</li></Link> }
      {Auth.isAuthenticated() &&  <Link className="nav_link" to="/"><li>My Trips</li></Link> }
      <li className="logo_container">
        <Link to="/" className="logo_link nav_link"><div className="logo"></div></Link>
      </li>
      {!Auth.isAuthenticated() && <Link className="nav_link" to="/register"><li>Register</li></Link> }
      {Auth.isAuthenticated() && <Link className="nav_link" to="/account"><li>Account</li></Link> }
      <Link className="nav_link" to="/tripplanner"><li>Trip Planner</li></Link>
    </ul>
  </nav>
  
)

export default withRouter(Navbar)