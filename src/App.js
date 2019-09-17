import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Broadcaster from './components/Broadcaster'
import Home from './components/home/Home'
import Listener from './components/pages/ListenerPage'
import SpotifyAuthenticator from './components/spotify-auth/SpotifyAuthenticator'
import SpotifyCallback from './components/spotify-auth/SpotifyCallback'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import Helmet from 'react-helmet'

class AppRouter extends React.Component {
  render() {
    return (
      <section>
        <Router>
          <Route exact path='/' component={Home} />
          <Route path='/spotify/callback' component={SpotifyCallback} />
          <Route path='/login' component={SpotifyAuthenticator} />

          <AuthenticatedRoute path='/broadcaster' component={Broadcaster} />
          <AuthenticatedRoute path='/listener' component={Listener} />
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

          <style>{'body { background-color: #171716}'}</style>
        </Helmet>
      </section>
    )
  }
}

export default AppRouter
