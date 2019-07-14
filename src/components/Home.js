import Cookies from 'js-cookie'
import React from 'react'
import { Redirect } from 'react-router-dom'

import silentDiscoApi from '../lib/silentdisco'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isLoggedIn: false,
      spotifyAuthUri: ''
    }
  }

  async componentDidMount() {
    if (Cookies.get('spotify_access_token')) {
      this.setState({
        isLoggedIn: true
      })
    } else {
      const spotifyAuthUri = await silentDiscoApi.fetchSpotifyAuthUri()
      this.setState({
        isLoading: false,
        spotifyAuthUri
      })
    }
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to='spotify/callback' />
    } else {
      return (
        <div>
          <h1>Vibe</h1>
          <a href={this.state.spotifyAuthUri}>Login To Spotify</a>
        </div>
      )
    }
  }
}

export default Home
