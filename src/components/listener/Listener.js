import React from 'react'
import querystring from 'query-string'

import spotifyApi from '../../lib/spotify'
import broadcastApi from '../../lib/broadcast'

import Navbar from '../home/Navbar'

import RoomInfo from './RoomInfo'
import ListenerPlayer from './player/ListenerPlayer'

import styled from 'styled-components'

const Body = styled.section`
  margin: 30px auto;
  width: 300px;
  text-align: center;
`

class Listener extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount() {
    const { broadcastId } = querystring.parse(this.props.location.search)
    const profile = await spotifyApi.getProfileInfo()
    const broadcast = await broadcastApi.listen(broadcastId)

    // poll for currently playing track
    const profileImage =
      profile.images && profile.images[0] && profile.images[0].url
        ? profile.images[0].url
        : ''

    this.setState({
      isLoading: false,
      broadcasterName: broadcast.broadcasterName,
      broadcastProfileImageUrl: broadcast.profileImageUrl,
      profileImage,
      broadcastId
    })
  }

  render() {
    let body
    if (this.state.isLoading) {
      body = <Body>Loading...</Body>
    } else {
      body = (
        <div>
          <Navbar loggedIn={true} />
          <RoomInfo
            broadcasterProfileImage={this.state.broadcastProfileImageUrl}
            broadcasterName={this.state.broadcasterName}
          />
          <ListenerPlayer broadcastId={this.state.broadcastId} />
        </div>
      )
    }
    return body
  }
}

export default Listener
