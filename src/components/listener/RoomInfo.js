import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { grey, H1 } from '../styles/base'
import OnAirSign from './OnAirSign'

const Banner = styled.section`
  height: 55px;
  display: flex;
  margin: 50px auto;
  align-items: center;
  justify-content: center;
`
const RoomText = styled(H1)`
  margin: 0px 15px;
`

const UserProfileImage = styled.img`
  border-radius: 50%;
  width: 35px;
  height: 35px;
  object-fit: cover;

  border: 1px solid ${grey};
`

function RoomInfo(props) {
  return (
    <Banner>
      <UserProfileImage src={props.broadcasterProfileImage} />
      <RoomText>{props.broadcasterName}'s Room</RoomText>
      <OnAirSign onAir={props.isBroadcasting} />
    </Banner>
  )
}

export default RoomInfo

RoomInfo.propTypes = {
  broadcasterName: PropTypes.string,
  broadcasterProfileImage: PropTypes.string,
  isBroadcasting: PropTypes.bool
}
