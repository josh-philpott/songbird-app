import React from 'react'

import styled from 'styled-components'
import { white, black } from '../styles/base'
import BlinkingGreenDot from './BlinkingGreenDot'
import Dot from '../Dot'

const Container = styled.section`
  height: 24px;
  width: 71px;
  border-radius: 3px;
  background-color: ${black};

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${white};
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  line-height: 197.19%;
  max-width: 71px;
`

function OnAirSign(props) {
  if (props.onAir) {
    return (
      <Container>
        <BlinkingGreenDot />
        ON AIR
      </Container>
    )
  } else {
    return (
      <Container>
        <Dot color={white} />
        OFF AIR
      </Container>
    )
  }
}

export default OnAirSign
