import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import MainNavigation from './components/Layout/MainNavigation'
import UserProfile from './components/Profile/UserProfile'
import AuthPage from './screens/AuthPage'
import HomePage from './screens/HomePage'
import AuthContext from './store/auth-context'

function App() {
    const { isLoggedIn } = useContext(AuthContext)
    return (
        <>
            <MainNavigation />
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn && <HomePage />}
                    {!isLoggedIn && <Redirect to="/auth" />}
                </Route>

                {!isLoggedIn && <Route path="/auth" component={AuthPage} />}

                <Route path="/profile">
                    {isLoggedIn && <UserProfile />}
                    {!isLoggedIn && <Redirect to="/auth" />}
                </Route>

                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
        </>
    )
}

export default App
