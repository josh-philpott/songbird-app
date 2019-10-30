import React, { useState, useEffect } from 'react'
import UserContext from './context'
import spotifyApi from '../../../lib/spotify'

const UserProvider = props => {
  const [value, setValue] = useState({
    id: '',
    displayName: '',
    imageUrl: ''
  })

  useEffect(() => {
    const fetchAndStoreUserProfile = async () => {
      const profile = await spotifyApi.getProfileInfo()
      const imageUrl = spotifyApi.extractProfileImage(profile)
      setValue({
        id: profile.id,
        displayName: profile.display_name,
        imageUrl
      })
    }
    fetchAndStoreUserProfile()
  }, [])

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  )
}

export default UserProvider
