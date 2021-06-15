/* eslint-disable no-unused-vars */
import React, { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router'

import AuthContext from '../../store/auth-context'
import Message from '../Layout/Message'
import classes from './ProfileForm.module.css'

const update = process.env.REACT_APP_UPDATE
const key = process.env.REACT_APP_KEY

const ProfileForm = () => {
    const [error, setError] = useState(null)
    const history = useHistory()

    const newPasswordInputRef = useRef()
    const context = useContext(AuthContext)

    const submitHandler = (event) => {
        event.preventDefault()

        const enteredNewPassword = newPasswordInputRef.current.value

        //add validaction here

        fetch(`${update}=${key}`, {
            method: 'POST',
            body: JSON.stringify({
                idToken: context.token,
                password: enteredNewPassword,
                returnSecureToken: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json().then((data) => {
                        history.replace('/')
                    })
                } else {
                    return res.json().then((data) => {
                        let errorMessage = data.error.message || 'Change password faild!'
                        setError(errorMessage)
                    })
                }
            })
            .catch((error) => {
                setError(error.message)
            })
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="new-password">New Password</label>
                <input type="password" id="new-password" ref={newPasswordInputRef} />
            </div>

            {error && <Message variant="danger">{error}</Message>}

            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    )
}

export default ProfileForm
