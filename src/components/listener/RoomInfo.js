import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Avatar from '../design-system/Avatar'
import { H1 } from '../styles/base'
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

function RoomInfo(props) {
  return (
    <Banner>
      <Avatar
        src={props.broadcasterProfileImage}
        size='xxl'
        applyBorder={true}
      />
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
