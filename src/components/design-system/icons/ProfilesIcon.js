import React from 'react'
import styled from 'styled-components'

const ProfilesIconBase = styled.img.attrs({
  src: process.env.PUBLIC_URL + '/img/profile-icon-white.svg'
})`
  width: 22px;
  height: 14px;
`

const ProfilesIcon = props => {
  return <ProfilesIconBase />
}

export default ProfilesIcon
