import React from 'react'

import styled from 'styled-components'
import { white, black, grey, H1 } from '../styles/base'
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

class RoomInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount() {}

  render() {
    return (
      <Banner>
        <UserProfileImage
          class='banner-element'
          src={this.props.broadcasterProfileImage}
        />
        <RoomText>{this.props.broadcasterName}'s Room</RoomText>
        <OnAirSign onAir={true} />
      </Banner>
    )
  }
}

export default RoomInfo
