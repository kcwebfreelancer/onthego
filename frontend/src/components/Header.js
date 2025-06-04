import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import { reset } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';


const Header = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        navigate('/login')
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        dispatch(reset());
    }
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    return (
        <>
            <Navbar>
                <NavbarBrand href="/">OnTheGo</NavbarBrand>

                <Nav className="me-auto" navbar>
                    {
                        window.location.pathname === '/' ?
                            <>
                                <NavItem>
                                    <NavLink href="/">Dashboard</NavLink>
                                </NavItem>
                            </> : null
                    }
                </Nav>
                <ul className='nav-link-logout'>
                    {
                        isLoggedIn ?
                            <>
                                <span>Welcome, <strong>{loggedInUser ? loggedInUser.user_details.name : null}</strong></span>
                                <button onClick={handleLogout} className='sign-out-button'><i className='fa fa-sign-out'></i></button>
                            </> : null

                    }{
                        <>
                            {
                                window.location.pathname === '/login' ?
                                    <>
                                        <NavItem>
                                            <NavLink to="/register">Register</NavLink>
                                        </NavItem>
                                    </> :
                                    null
                            }
                            {
                                window.location.pathname === '/register' ?
                                    <>
                                        <NavItem>
                                            <NavLink to="/login">Login</NavLink>
                                        </NavItem>
                                    </> :
                                    null
                            }

                        </>
                    }

                </ul>
            </Navbar>
        </>
    )
}

export default Header;