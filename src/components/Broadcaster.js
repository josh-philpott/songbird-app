import React from 'react'
import { Helmet } from 'react-helmet'

import spotifyApi from '../lib/spotify'
import broadcastApi from '../lib/broadcast'
//import nanoid from 'nanoid'

const broadcastId = 'abc' //nanoid

class Broadcaster extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      name: '',
      profileImage: '',
      isBroadcasting: false
    }
  }

  async logCurrentlyPlaying() {
    const currentlyPlaying = await spotifyApi.getCurrentlyPlaying()

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

    setTimeout(this.logCurrentlyPlaying.bind(this), 3000)
  }

  async componentDidMount() {
    const profile = await spotifyApi.getProfileInfo()
    this.setState({
      isLoading: false,
      name: profile.display_name,
      profileImage: profile.images[0].url
    })
    // poll for currently playing track
    this.logCurrentlyPlaying()
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
          <p>${broadcastId}</p>
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
