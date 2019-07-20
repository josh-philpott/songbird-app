import React from 'react'
import { Helmet } from 'react-helmet'

import spotifyApi from '../lib/spotify'
import broadcastApi from '../lib/broadcast'

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

    await broadcastApi.broadcast({ broadcastId, currentlyPlaying })

    if (!currentlyPlaying) {
      this.setState({ isBroadcasting: false })
    } else {
      console.log('Broadcasting!')
      this.setState({
        isBroadcasting: true,
        ...currentlyPlaying
      })
    }

    setTimeout(this.broadcast.bind(this), 3000)
  }

  async componentDidMount() {
    const profile = await spotifyApi.getProfileInfo()
    const broadcastId = await broadcastApi.create()
    this.setState({
      isLoading: false,
      name: profile.display_name,
      profileImage: profile.images[0].url,
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
          <img src={this.state.profileImage} alt='User Profile Photo' />
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
            Broadcast URL: http://localhost:3001/listener?broadcastId=
            {this.state.broadcastId}
          </p>
          {currentlyBroadcasting}
        </div>
      )
    }
    return (
      <div>
        <Helmet>
          <script src='https://sdk.scdn.co/spotify-player.js' />
        </Helmet>
        {body}
      </div>
    )
  }
}

export default Broadcaster
