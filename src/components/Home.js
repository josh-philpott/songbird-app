import axios from 'axios'
import React from 'react'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      spotifyAuthUri: ''
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get(
        'http://localhost:3002/api/spotify/login'
      )
      const spotifyAuthUri = response.data
      this.setState({
        isLoading: false,
        spotifyAuthUri
      })

      console.log(response)
    } catch (error) {
      console.log(error)
      console.log(error.response)
    }
  }

  render() {
    return (
      <div>
        <h1>Vibe</h1>
        <a href={this.state.spotifyAuthUri}>Login To Spotify</a>
      </div>
    )
  }
}

export default Home
