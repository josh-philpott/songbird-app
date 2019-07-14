import React from 'react'
import { BrowserRouter as Router, Route, DefaultRoute } from 'react-router-dom'
import Broadcaster from './components/Broadcaster'
import Home from './components/Home'
import SpotifyCallback from './components/SpotifyCallback'

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={Home} />
        <Route path='/spotify/callback' component={SpotifyCallback} />
        <Route path='/broadcaster' component={Broadcaster} />
      </Router>
    )
  }
}

export default AppRouter
