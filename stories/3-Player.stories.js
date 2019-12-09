import React from 'react'
import { action } from '@storybook/addon-actions'

import Player from '../src/components/room/player/Player'
import spotifyCurrentlyPlaying from './resources/spotify-currently-playing'

export default {
  title: 'Player'
}

export const BroadcasterNothingIsPlaying = () => (
  <Player
    broadcastMeta={{
      broadcastId: 'test',
      profileImageUrl: '',
      displayName: 'Josh Philpott'
    }}
  />
)

export const BroadcasterPlaying = () => (
  <Player
    broadcastMeta={{
      broadcastId: 'test',
      profileImageUrl: '',
      displayName: 'Josh Philpott'
    }}
    currentlyPlaying={spotifyCurrentlyPlaying}
    isBroadcaster
  />
)
