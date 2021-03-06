import React from 'react'
import { Redirect } from 'react-router-dom'
import LoadingSpinner from '../design-system/LoadingSpinner'

import Cookies from 'js-cookie'
import queryString from 'query-string'

import songbirdApi from '../../lib/songbird'

class SpotifyCallback extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      redirectLocation: ''
    }
  }

  async componentDidMount() {
    const params = queryString.parse(this.props.location.search)
    const code = params.code || null
    const state = params.state || null

    const redirectLocation = Cookies.get('redirect_location') || '/dashboard'
    Cookies.remove('redirect_location')

    await songbirdApi.fetchSpotifyAccessToken(code, state)

    this.setState({
      isLoading: false,
      redirectLocation
    })
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingSpinner />
    } else {
      return <Redirect to={this.state.redirectLocation} />
    }
  }
}

export default SpotifyCallback
