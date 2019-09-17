import React, { useState, useEffect } from 'react'

import spotifyApi from '../../lib/spotify'
import broadcastApi from '../../lib/broadcast'
import { H1, P } from '../styles/base'
import Navbar from '../Navbar'

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

    broadcastApi.registerListener(newBroadcastId, true, currentlyPlaying => {
      console.log(`broadcast updated ${JSON.stringify(currentlyPlaying)}`)
    })

    setName(profile.display_name)
    setProfileImage(profileImageUrl)
    setBroadcastId(newBroadcastId)
    setIsLoading(false)

    broadcast(newBroadcastId)
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
      currentlyBroadcasting = <P>Currently Broadcasting: {songName}</P>
    }

    return (
      <>
        <Navbar loggedIn={true} />

        <>
          <H1>Hey, {name}</H1>
          <img src={profileImage} alt='User Profile' />
        </>
        <P>
          Broadcast URL: https://songbridge.netlify.com/listener?broadcastId=
          {broadcastId}
        </P>
        {currentlyBroadcasting}
      </>
    )
  }
}

export default BroadcasterPage
