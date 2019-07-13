import axios from 'axios'
import React from 'react'
import queryString from 'query-string'

class SpotifyCallback extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      name: '',
      profileImage: ''
    }
  }

  getHashParams() {
    var hashParams = {}
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1)
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2])
    }
    console.log(window.location)
    return hashParams
  }

  async getAccessToken() {
    const params = queryString.parse(this.props.location.search)
    const code = params.code || null
    const state = params.state || null

    const response = await axios.post(
      'http://localhost:3002/api/spotify/getAccessToken',
      {
        code,
        state
      }
    )

    return response.data
  }

  async getProfileInfo(access_token) {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: 'Bearer ' + access_token }
    })

    return response.data
  }

  async componentDidMount() {
    const params = queryString.parse(this.props.location.search)

    const { access_token } = await this.getAccessToken() //TODO: Store to local storage
    const profile = await this.getProfileInfo(access_token)
    this.setState({
      isLoading: false,
      name: profile.display_name,
      profileImage: profile.images[0].url
    })
    console.log(profile)
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading Profile...</div>
    } else {
      return (
        <div>
          <h1>Sup, {this.state.name}</h1>
          <img src={this.state.profileImage} alt='User Profile Photo' />
        </div>
      )
    }
  }
}

export default SpotifyCallback
