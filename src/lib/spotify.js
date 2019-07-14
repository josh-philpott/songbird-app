import axios from 'axios'
import querystring from 'querystring'
import Cookies from 'js-cookie'

const CLIENT_ID = 'b272fc29d92a4976b7e672079986f602'

const getAccessToken = () => {
  //Check and see if an access_token is available
  return Cookies.get('spotify_access_token')
}

const generateSpotifyAuthLink = () => {
  const generateRandomString = length => {
    var text = ''
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  var state = generateRandomString(16)
  var stateKey = 'spotify_auth_state'

  document.cookie = `${stateKey}=${state};max-age=604800;domain=localhost:3002`

  // your application requests authorization
  const redirectUri = 'http://localhost:3002/spotify/callback'
  var scope = 'user-read-private user-read-email'
  return `https://accounts.spotify.com/authorize?${querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: redirectUri,
    state: state
  })}`
}

const getProfileInfo = async () => {
  const response = await axios.get('https://api.spotify.com/v1/me', {
    headers: { Authorization: 'Bearer ' + getAccessToken() }
  })

  return response.data
}

export default {
  getAccessToken,
  generateSpotifyAuthLink,
  getProfileInfo
}
