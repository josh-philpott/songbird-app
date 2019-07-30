import React from 'react'

import spotifyApi from '../lib/spotify'
import broadcastApi from '../lib/broadcast'

const IS_DEV_MODE = process.env.REACT_APP_DEV_MODE === 'true'

class Broadcaster extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      name: '',
      profileImage: '',
      isBroadcasting: false,
      broadcastId: ''
    }
  }

  async broadcast() {
    const currentlyPlaying = await spotifyApi.getCurrentlyPlaying()
    const { broadcastId } = this.state

    await broadcastApi.broadcast({
      broadcastId,
      currentlyPlaying
    })

    if (!currentlyPlaying) {
      this.setState({ isBroadcasting: false })
    } else {
      console.debug('Broadcasting!')
      this.setState({
        isBroadcasting: true,
        ...currentlyPlaying
      })
    }

    setTimeout(this.broadcast.bind(this), 1000)
  }

  async componentDidMount() {
    const profile = await spotifyApi.getProfileInfo()

    const profileImageUrl =
      profile && profile.images && profile.images[0]
        ? profile.images[0].url
        : ''
    const broadcastId = await broadcastApi.create(
      profile.display_name,
      profileImageUrl,
      IS_DEV_MODE
    )

    this.setState({
      isLoading: false,
      name: profile.display_name,
      profileImage: profileImageUrl,
      broadcastId: broadcastId
    })
    // poll for currently playing track
    this.broadcast()
  }

  render() {
    let body
    if (this.state.isLoading) {
      body = <div>Loading...</div>
    } else {
      let profileInfo = (
        <div>
          <h1>Sup, {this.state.name}</h1>
          <img src={this.state.profileImage} alt='User Profile' />
        </div>
      )

      let currentlyBroadcasting

      if (!this.state.isBroadcasting) {
        currentlyBroadcasting = (
          <p>
            To start broadcasting, open up a spotify player and start playing a
            song!
          </p>
        )
      } else {
        currentlyBroadcasting = (
          <div>Currently Broadcasting: {this.state.item.name}</div>
        )
      }

      body = (
        <div>
          {profileInfo}
          <p>
            Broadcast URL: https://songbridge.netlify.com/listener?broadcastId=
            {this.state.broadcastId}
          </p>
          {currentlyBroadcasting}
        </div>
      )
    }
    return <div>{body}</div>
  }
}

export default Broadcaster
