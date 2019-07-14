import axios from 'axios'
import React from 'react'
import { Redirect } from 'react-router-dom'

import queryString from 'query-string'

import silentDiscoApi from '../lib/silentdisco'
import spotifyApi from '../lib/spotify'

class SpotifyCallback extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      name: '',
      profileImage: ''
    }
  }

  async componentDidMount() {
    const params = queryString.parse(this.props.location.search)
    const code = params.code || null
    const state = params.state || null

    await silentDiscoApi.fetchSpotifyAccessToken(code, state)
    const profile = await spotifyApi.getProfileInfo()
    this.setState({
      isLoading: false,
      name: profile.display_name,
      profileImage: profile.images[0].url
    })
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading Profile...</div>
    } else {
      return <Redirect to='/broadcaster' />
    }
  }
}

export default SpotifyCallback
