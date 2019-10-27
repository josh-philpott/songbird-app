import axios from 'axios'
import Cookies from 'js-cookie'

import songbridgeApi from './songbird'

const isOfflineMode = process.env.REACT_APP_IS_OFFLINE_MODE === 'true'

const getAccessToken = async () => {
  if (isOfflineMode) {
    return 'offline'
  }

  //Check and see if an access_token is available
  const storedAccessToken = Cookies.get('spotify_access_token')
  const refreshToken = Cookies.get('spotify_refresh_token')

  if (storedAccessToken) {
    return storedAccessToken
  } else if (refreshToken) {
    await songbridgeApi.refreshSpotifyToken(refreshToken)
    return Cookies.get('spotify_access_token')
  } else {
    window.location.assign('/')
  }
}

const getProfileInfo = async () => {
  if (isOfflineMode) {
    return {
      id: 'offline-id',
      display_name: ' Josh.Is.Offline'
    }
  }
  const accessToken = await getAccessToken()
  const response = await axios.get('https://api.spotify.com/v1/me', {
    headers: { Authorization: 'Bearer ' + accessToken }
  })

  return response.data
}

const getCurrentlyPlaying = async () => {
  if (isOfflineMode) {
    /*return {
      timestamp: 1572398566917,
      context: {
        external_urls: {
          spotify: 'https://open.spotify.com/playlist/37i9dQZF1DWXLeA8Omikj7'
        },
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DWXLeA8Omikj7',
        type: 'playlist',
        uri: 'spotify:user:spotify:playlist:37i9dQZF1DWXLeA8Omikj7'
      },
      progress_ms: 22575,
      item: {
        album: {
          album_type: 'album',
          artists: [
            {
              external_urls: {
                spotify:
                  'https://open.spotify.com/artist/5k5eiijuHxrGwXp2Pz37GZ'
              },
              href: 'https://api.spotify.com/v1/artists/5k5eiijuHxrGwXp2Pz37GZ',
              id: '5k5eiijuHxrGwXp2Pz37GZ',
              name: 'Justin Jay',
              type: 'artist',
              uri: 'spotify:artist:5k5eiijuHxrGwXp2Pz37GZ'
            }
          ],
          available_markets: [
            'AD',
            'AE',
            'AR',
            'AT',
            'AU',
            'BE',
            'BG',
            'BH',
            'BO',
            'BR',
            'CA',
            'CH',
            'CL',
            'CO',
            'CR',
            'CY',
            'CZ',
            'DE',
            'DK',
            'DO',
            'DZ',
            'EC',
            'EE',
            'EG',
            'ES',
            'FI',
            'FR',
            'GB',
            'GR',
            'GT',
            'HK',
            'HN',
            'HU',
            'ID',
            'IE',
            'IL',
            'IN',
            'IS',
            'IT',
            'JO',
            'JP',
            'KW',
            'LB',
            'LI',
            'LT',
            'LU',
            'LV',
            'MA',
            'MC',
            'MT',
            'MX',
            'MY',
            'NI',
            'NL',
            'NO',
            'NZ',
            'OM',
            'PA',
            'PE',
            'PH',
            'PL',
            'PS',
            'PT',
            'PY',
            'QA',
            'RO',
            'SA',
            'SE',
            'SG',
            'SK',
            'SV',
            'TH',
            'TN',
            'TR',
            'TW',
            'US',
            'UY',
            'VN',
            'ZA'
          ],
          external_urls: {
            spotify: 'https://open.spotify.com/album/3EmYKkH9IcPWIc3OoFz0Sl'
          },
          href: 'https://api.spotify.com/v1/albums/3EmYKkH9IcPWIc3OoFz0Sl',
          id: '3EmYKkH9IcPWIc3OoFz0Sl',
          images: [
            {
              height: 640,
              url:
                'https://i.scdn.co/image/ab67616d0000b273b38ee985bd72529cb91d93e5',
              width: 640
            },
            {
              height: 300,
              url:
                'https://i.scdn.co/image/ab67616d00001e02b38ee985bd72529cb91d93e5',
              width: 300
            },
            {
              height: 64,
              url:
                'https://i.scdn.co/image/ab67616d00004851b38ee985bd72529cb91d93e5',
              width: 64
            }
          ],
          name: 'Home',
          release_date: '2017-10-12',
          release_date_precision: 'day',
          total_tracks: 14,
          type: 'album',
          uri: 'spotify:album:3EmYKkH9IcPWIc3OoFz0Sl'
        },
        artists: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/5k5eiijuHxrGwXp2Pz37GZ'
            },
            href: 'https://api.spotify.com/v1/artists/5k5eiijuHxrGwXp2Pz37GZ',
            id: '5k5eiijuHxrGwXp2Pz37GZ',
            name: 'Justin Jay',
            type: 'artist',
            uri: 'spotify:artist:5k5eiijuHxrGwXp2Pz37GZ'
          }
        ],
        available_markets: [
          'AD',
          'AE',
          'AR',
          'AT',
          'AU',
          'BE',
          'BG',
          'BH',
          'BO',
          'BR',
          'CA',
          'CH',
          'CL',
          'CO',
          'CR',
          'CY',
          'CZ',
          'DE',
          'DK',
          'DO',
          'DZ',
          'EC',
          'EE',
          'EG',
          'ES',
          'FI',
          'FR',
          'GB',
          'GR',
          'GT',
          'HK',
          'HN',
          'HU',
          'ID',
          'IE',
          'IL',
          'IN',
          'IS',
          'IT',
          'JO',
          'JP',
          'KW',
          'LB',
          'LI',
          'LT',
          'LU',
          'LV',
          'MA',
          'MC',
          'MT',
          'MX',
          'MY',
          'NI',
          'NL',
          'NO',
          'NZ',
          'OM',
          'PA',
          'PE',
          'PH',
          'PL',
          'PS',
          'PT',
          'PY',
          'QA',
          'RO',
          'SA',
          'SE',
          'SG',
          'SK',
          'SV',
          'TH',
          'TN',
          'TR',
          'TW',
          'US',
          'UY',
          'VN',
          'ZA'
        ],
        disc_number: 1,
        duration_ms: 139354,
        explicit: false,
        external_ids: { isrc: 'QM24S1703630' },
        external_urls: {
          spotify: 'https://open.spotify.com/track/6saPrg6S00jIed8tGj6DpW'
        },
        href: 'https://api.spotify.com/v1/tracks/6saPrg6S00jIed8tGj6DpW',
        id: '6saPrg6S00jIed8tGj6DpW',
        is_local: false,
        name: 'Home Pt. 1',
        popularity: 51,
        preview_url:
          'https://p.scdn.co/mp3-preview/75bc5232e6f3913030111e2bfe6c4eac64f6b116?cid=b272fc29d92a4976b7e672079986f602',
        track_number: 1,
        type: 'track',
        uri: 'spotify:track:6saPrg6S00jIed8tGj6DpW'
      },
      currently_playing_type: 'track',
      actions: { disallows: { resuming: true, skipping_prev: true } },
      is_playing: true
    }
  }*/
    return null
  }
  const accessToken = await getAccessToken()
  const response = await axios.get(
    'https://api.spotify.com/v1/me/player/currently-playing',
    {
      headers: { Authorization: 'Bearer ' + accessToken }
    }
  )
  return response.data
}

const pause = async () => {
  if (isOfflineMode) return
  const accessToken = await getAccessToken()
  await axios.put(
    'https://api.spotify.com/v1/me/player/pause',
    {},
    {
      headers: { Authorization: 'Bearer ' + accessToken }
    }
  )
}

const play = async (uri, position_ms, deviceId) => {
  if (isOfflineMode) return
  const accessToken = await getAccessToken()
  await axios.put(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    {
      uris: [uri],
      position_ms
      //TODO: I need to control the device here... We'll need a UI element for that as well
    },
    {
      headers: { Authorization: 'Bearer ' + accessToken }
    }
  )
}

//utils
const extractProfileImage = profile => {
  return profile && profile.images && profile.images[0]
    ? profile.images[0].url
    : ''
}

export default {
  // Spotify API Requests
  getAccessToken,
  getCurrentlyPlaying,
  getProfileInfo,
  pause,
  play,
  // Utility functions
  extractProfileImage
}
