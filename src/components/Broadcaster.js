import React from 'react'
import spotifyApi from '../lib/spotify'

class Broadcaster extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      name: '',
      profileImage: ''
    }
  }

  async componentDidMount() {
    const profile = await spotifyApi.getProfileInfo()
    this.setState({
      isLoading: false,
      name: profile.display_name,
      profileImage: profile.images[0].url
    })
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>
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

export default Broadcaster
