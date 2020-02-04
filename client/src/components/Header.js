import React from 'react'
import logo from "../images/foody_logo.JPG";

export default function Header() {
    return (
         <nav className="navbar">
          <div className="navbar-brand">
            <img src={logo} className="img-fluid" alt="application-logo" />
          </div>
        </nav>
    )
}
