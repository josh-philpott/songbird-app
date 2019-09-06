import React from 'react'
import querystring from 'query-string'

import spotifyApi from '../../lib/spotify'
import broadcastApi from '../../lib/broadcast'

import Navbar from '../home/Navbar'

import RoomInfo from './RoomInfo'
import ListenerPlayer from './player/ListenerPlayer'

import styled from 'styled-components'
import { buttonBase } from '../styles/base'

const Body = styled.section`
  margin: 30px auto;
  width: 300px;
  text-align: center;
`

const SyncButton = styled.button`
  width: 238px;
  height: 44px;

  margin: 0px auto;

  ${buttonBase}
`
class Listener extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      syncEnabled: false,
      isBroadcasting: false
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

  toggleSyncEnabled() {
    this.setState({
      syncEnabled: !this.state.syncEnabled
    })
  }

  handleBroadcastStatusChange(isBroadcasting) {
    this.setState({
      isBroadcasting
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
            isBroadcasting={this.state.isBroadcasting}
          />

          {this.state.syncEnabled ? (
            <SyncButton onClick={this.toggleSyncEnabled.bind(this)}>
              <span>pause broadcast</span>
            </SyncButton>
          ) : (
            <SyncButton onClick={this.toggleSyncEnabled.bind(this)}>
              <img
                src={process.env.PUBLIC_URL + '/img/play-icon.svg'}
                alt='play'
              />
              <span>play broadcast</span>
            </SyncButton>
          )}

          <ListenerPlayer
            broadcastId={this.state.broadcastId}
            syncEnabled={this.state.syncEnabled}
            handleBroadcastStatusChange={this.handleBroadcastStatusChange.bind(
              this
            )}
          />
        </div>
      )
    }
    return body
  }
}

export default Listener
