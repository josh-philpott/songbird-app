import React from 'react'
import Cookies from 'js-cookie'
import { Route, Redirect } from 'react-router-dom'

const isOfflineMode = process.env.REACT_APP_IS_OFFLINE_MODE === 'true'

const isLoggedIn = () => {
  const isLoggedIn = Cookies.get('spotify_access_token') !== undefined
  return isLoggedIn
}

const getRedirectLocation = () => {
  return `/login?to=${window.location.pathname}${window.location.search}`
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() === true || isOfflineMode ? (
        <Component {...props} />
      ) : (
        <Redirect to={getRedirectLocation()} />
      )
    }
  />
)

export default AuthenticatedRoute
