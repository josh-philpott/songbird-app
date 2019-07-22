import React from 'react'
import Cookies from 'js-cookie'
import { Route, Redirect } from 'react-router-dom'

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
      isLoggedIn() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={getRedirectLocation()} />
      )
    }
  />
)

export default AuthenticatedRoute
