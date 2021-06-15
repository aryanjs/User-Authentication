import React, { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router'

import AuthContext from '../../store/auth-context'
import Message from '../Layout/Message'
import Spinner from '../Layout/Spinner'
import classes from './AuthForm.module.css'

const sign_up = process.env.REACT_APP_SIGNUP
const sign_in = process.env.REACT_APP_SIGNIN
const key = process.env.REACT_APP_KEY

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const history = useHistory()

    const emailInputRef = useRef()
    const passwordInputRef = useRef()

    const context = useContext(AuthContext)

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        const enteredEmail = emailInputRef.current.value
        const enterdPassword = passwordInputRef.current.value

        // add validation here

        setIsLoading(true)
        let url

        if (isLogin) {
            url = `${sign_in}=${key}`
        }
        // else signup
        else {
            url = `${sign_up}=${key}`
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enterdPassword,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                setIsLoading(false)

                if (res.ok) {
                    return res.json()
                } else {
                    res.json().then((data) => {
                        let errorMessage = data.error.message || 'Authentication faild!'
                        setError(errorMessage)
                    })
                }
            })
            .then((data) => {
                context.login(data.idToken, data.email)
                history.replace('/')
            })
            .catch((error) => {
                setError(error.message)
            })
    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            {error && <Message variant="danger">{error}</Message>}
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" required ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input type="password" id="password" required ref={passwordInputRef} />
                </div>
                <div className={classes.actions}>
                    {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
                    {isLoading && (
                        <div className="centered">
                            <Spinner />
                        </div>
                    )}
                    <button
                        type="button"
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}>
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default AuthForm
