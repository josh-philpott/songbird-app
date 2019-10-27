import React from 'react'
import Flex from '../../design-system/Flex'
import Button from '../../design-system/Button'

import { P, H2 } from '../../styles/base'

function NothingIsPlaying() {
  return (
    <>
      <Flex
        height='100%'
        width='100%'
        alignItems='center'
        justifyContent='center'
        style={{ textAlign: 'center' }}>
        <H2>You're not playing anything...</H2>
        <P>
          To begin broadcasting, open Spotify and start playing music. Share the
          link to have your friends listen along with you.
        </P>
        <Button
          style={{ backgroundColor: '#F1EEEA', color: '#2B2A2A' }}
          onClick={() => {
            window.open('https://open.spotify.com')
          }}>
          <img
            src={process.env.PUBLIC_URL + '/img/spotify-logo-dark.svg'}
            alt='spotify logo'
            style={{ marginRight: '15px' }}
          />
          Open Spotify
        </Button>
      </Flex>
      <span style={{ height: '100px' }}></span>
    </>
  )
}

export default NothingIsPlaying
