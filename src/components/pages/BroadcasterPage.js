import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import spotifyApi from '../../lib/spotify'
import broadcastApi from '../../lib/broadcast'
import { H1, H2, P } from '../styles/base'
import Navbar from '../Navbar'
import Room from '../room/Room'

const CenterFlex = styled.section`
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

function BroadcasterPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [broadcastEnabled, setBroadcastEnabled] = useState(true)
  const [broadcastId, setBroadcastId] = useState('')

  const broadcastEnabledRef = useRef(broadcastEnabled)
  broadcastEnabledRef.current = broadcastEnabled

  const getBroadcastEnabled = () => {
    return broadcastEnabled
  }

  const getBroadcastId = () => {
    return broadcastId
  }

  const fetchSpotifyProfileAndCreateBroadcast = async () => {
    const profile = await spotifyApi.getProfileInfo()
    const profileImageUrl = spotifyApi.extractProfileImage(profile)
    const newBroadcastId = await broadcastApi.init(
      profile.id,
      profile.display_name,
      profileImageUrl
    )

    console.log(`[BroadcasterPage] broadcast ${newBroadcastId} initialized`)

    setBroadcastId(newBroadcastId)
    setIsLoading(false)

    await broadcast(newBroadcastId, getBroadcastEnabled)
  }

  const broadcast = async (broadcastId, getBroadcastEnabled) => {
    if (broadcastEnabledRef.current) {
      console.debug(`[BroadcasterPage] updating broadcast ${broadcastId}`)
      const currentlyPlaying = await spotifyApi.getCurrentlyPlaying()
      await broadcastApi.broadcast(broadcastId, currentlyPlaying)
    }
    setTimeout(broadcast.bind(this, broadcastId, getBroadcastEnabled), 1000)
  }

  const toggleBroadcastEnabled = () => {
    setBroadcastEnabled(!broadcastEnabled)
    broadcastEnabledRef.current = broadcastEnabled
  }

  useEffect(() => {
    fetchSpotifyProfileAndCreateBroadcast()
  }, [])

  useEffect(() => {
    if (!broadcastEnabled) {
      broadcastApi.pauseBroadcast(broadcastId)
    }
  }, [broadcastEnabled])

  if (isLoading) {
    return <H1>Loading...</H1>
  } else {
    return (
      <>
        <Navbar loggedIn={true} />
        <Room
          isBroadcaster={true}
          broadcastId={broadcastId}
          toggleBroadcastEnabled={toggleBroadcastEnabled}
          broadcastEnabled={broadcastEnabled}
        />
      </>
    )
  }
}

export default BroadcasterPage
