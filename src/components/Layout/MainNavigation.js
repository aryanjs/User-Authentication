/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import classes from '../../assets/css/layout/MainNavigation.module.scss'
import AuthContext from '../../store/auth-context'

const MainNavigation = () => {
    const { email, isLoggedIn, logout } = useContext(AuthContext)

    const logoutHandler = () => {
        logout()
    }

    return (
        <Navbar className={classes.header} bg="dark" expand="lg" variant="dark">
            <Navbar.Brand>
                <Link className={classes.logo} to="/">
                    React Auth
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {!isLoggedIn ? (
                        <Link className={classes.navbar} to="/auth">
                            Login
                        </Link>
                    ) : (
                        <>
                            <Link className={classes.navbar} to="/profile">
                                Profile
                            </Link>
                            <div className={classes.navbar}>{email}</div>
                            <Button variant="outline-secondary" onClick={logoutHandler}>
                                Logout
                            </Button>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default MainNavigation
