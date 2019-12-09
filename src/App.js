import React from 'react'

import 'normalize.css'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import BroadcasterPage from './components/pages/BroadcasterPage'
import Home from './components/pages/HomePage'
import ListenerPage from './components/pages/ListenerPage'
import SpotifyAuthenticator from './components/spotify-auth/SpotifyAuthenticator'
import SpotifyCallback from './components/spotify-auth/SpotifyCallback'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import Helmet from 'react-helmet'
import DashboardPage from './components/pages/DashboardPage'

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body { 
    background-color: #171716; 
    height: 100%; 
    overflow: auto;
  } 
  
  html {
    overflow:hidden; 
    height:100%;
    font-size:16px;
  } 
  
  *{
    box-sizing: border-box
  }
`

class AppRouter extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Route exact path='/' component={Home} />
          <Route path='/spotify/callback' component={SpotifyCallback} />
          <Route path='/login' component={SpotifyAuthenticator} />

          <AuthenticatedRoute path='/broadcaster' component={BroadcasterPage} />
          <AuthenticatedRoute path='/listener' component={ListenerPage} />
          <AuthenticatedRoute path='/dashboard' component={DashboardPage} />
        </Router>
        <Helmet>
          <link
            href='https://fonts.googleapis.com/css?family=Heebo:300,400,500&display=swap'
            rel='stylesheet'
          />
          <link
            href='https://fonts.googleapis.com/css?family=Open+Sans&display=swap'
            rel='stylesheet'
          />
        </Helmet>
        <GlobalStyle />
      </>
    )
  }
}

export default AppRouter
