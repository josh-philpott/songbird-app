import Cookies from 'js-cookie'
import React from 'react'
import queryString from 'query-string'

import songbirdApi from '../../lib/songbird'

class SpotifyAuthenticator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      spotifyAuthUri: ''
    }
  }

  async componentDidMount() {
    const params = queryString.parse(this.props.location.search)

    if (params.to) {
      Cookies.set('redirect_location', params.to)
    }

    const spotifyAuthUri = await songbirdApi.fetchSpotifyAuthUri()
    this.setState({
      isLoading: false,
      spotifyAuthUri
    })
    window.location.assign(spotifyAuthUri)
  }

  render() {
    return <div>Redirecting to spotify...</div>
  }
}

export default SpotifyAuthenticator
