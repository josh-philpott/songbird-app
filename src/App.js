import React from 'react'
import { BrowserRouter as Router, Route, DefaultRoute } from 'react-router-dom'
import SpotifyCallback from './components/SpotifyCallback'
import Home from './components/Home'

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={Home} />
        <Route path='/spotify/callback' component={SpotifyCallback} />
      </Router>
    )
  }
}

export default AppRouter
