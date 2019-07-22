import Cookies from 'js-cookie'
import React from 'react'
import { Redirect } from 'react-router-dom'

import songbirdApi from '../lib/songbird'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {}

  render() {
    return (
      <div>
        <h1>Songbird</h1>
        <a href='/login'>Login With Spotify</a>
      </div>
    )
  }
}

export default Home
