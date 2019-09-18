import React from 'react'
import styled from 'styled-components'

const ProfilesIcon = props => {
  const ProfilesIcon = styled.img.attrs({ src: '/img/profile-icon.svg' })`
    width: 22px;
    height: 14px;
  `
  return props.color === 'black' ? (
    <ProfilesIcon src={'/img/profile-icon-black.svg'} />
  ) : (
    <ProfilesIcon src={'/img/profile-icon-white.svg'} />
  )
}

export default ProfilesIcon
