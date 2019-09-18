import React, { useState, useEffect } from 'react'
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
  const [name, setName] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [isBroadcasting, setIsBroadcasting] = useState(false)
  const [broadcastId, setBroadcastId] = useState('')
  const [songName, setSongName] = useState('')

  const fetchSpotifyProfileAndCreateBroadcast = async () => {
    const profile = await spotifyApi.getProfileInfo()
    const profileImageUrl = spotifyApi.extractProfileImage(profile)
    const newBroadcastId = await broadcastApi.create(
      profile.id,
      profile.display_name,
      profileImageUrl
    )

    console.log(`broadcast ${newBroadcastId} created`)

    setName(profile.display_name)
    setProfileImage(profileImageUrl)
    setBroadcastId(newBroadcastId)
    setIsLoading(false)

    await broadcast(newBroadcastId)
  }

  const broadcast = async broadcastId => {
    const currentlyPlaying = await spotifyApi.getCurrentlyPlaying()
    await broadcastApi.broadcast(broadcastId, currentlyPlaying)

    if (!currentlyPlaying) {
      setIsBroadcasting(false)
    } else {
      setIsBroadcasting(true)
      setSongName(currentlyPlaying.item.name)
    }

    setTimeout(broadcast.bind(this, broadcastId), 1000)
  }

  useEffect(() => {
    fetchSpotifyProfileAndCreateBroadcast()
  }, [])

  if (isLoading) {
    return <H1>Loading...</H1>
  } else {
    let currentlyBroadcasting

    if (!isBroadcasting) {
      currentlyBroadcasting = (
        <P>
          To start broadcasting, open up a spotify player and start playing a
          song!
        </P>
      )
    } else {
      currentlyBroadcasting = (
        <Room isBroadcaster={true} broadcastId={broadcastId} />
      )
    }

    console.log(currentlyBroadcasting)
    return (
      <>
        <Navbar loggedIn={true} />
        {currentlyBroadcasting}
        <CenterFlex>
          <H2>Share Your Broadcast</H2>
          <P>
            {'https://songbridge.netlify.com/listener?broadcastId=' +
              broadcastId}
          </P>
        </CenterFlex>
      </>
    )
  }
}

export default BroadcasterPage