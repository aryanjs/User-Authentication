import React, { useState } from 'react'

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    // eslint-disable-next-line no-unused-vars
    login: (token) => {},
    logout: () => {}
})

// named export
export const AuthContextProvider = ({ children }) => {
    // this one check if the user open the browser and
    // they are already logged in (1 hour ago), keep user logged in
    // otherweise, token is null
    const initialToken = localStorage.getItem('token')
    const initialEmail = localStorage.getItem('email')

    const [token, setToken] = useState(initialToken)
    const [email, setEmail] = useState(initialEmail ? initialEmail.split('@')[0] : '')

    // !! means convert to opposite(true <-> false)
    const userIsLoggedIn = !!token

    const loginHandler = (token, email) => {
        setToken(token)
        setEmail(email ? email.split('@')[0] : email)

        localStorage.setItem('token', token)
        localStorage.setItem('email', email)
    }
    const logoutHandler = () => {
        setToken(null)
        setEmail(null)
        localStorage.removeItem('token')
        localStorage.removeItem('email')
    }

    const contextValue = {
        email: email,
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

// export as default
export default AuthContext
