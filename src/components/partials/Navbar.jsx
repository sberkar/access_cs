import React, {useRef} from 'react';
import logo from './logo.svg';
import {FaBars, FaTimes} from "react-icons/fa"
import "../styles/navbar.css"
import { NavLink } from 'react-router-dom';

function Navbar() {
    let navRef = useRef()

    const ElemToggler = () => {
        navRef.current.classList.toggle("res-other-area")
    }
  return (
        <header className="header">
        <div className="logo-area">
            <NavLink to="/">
                <img src={logo} alt="logo" height="60px"/>
            </NavLink>
        </div>
        <div className="other-area" ref={navRef}>
            
                <div>
                    <NavLink to="/login">
                        Random
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/login">
                        Categories
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/login">
                        Login
                    </NavLink>
                </div>
                <div className="close-res-nav">
                    <button onClick={ElemToggler}>
                        <FaTimes className='ico' />
                    </button>
                </div>

        </div>
        <button className="mobi-togg" onClick={ElemToggler}>
                <FaBars className='ico' />
            </button></header>
    )
}

export default Navbar;