import React from 'react'

import styled from 'styled-components'
import { white, black } from '../styles/base'
import BlinkingGreenDot from './BlinkingGreenDot'

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
const WhiteDot = styled.section`
  height: 6px;
  width: 6px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: ${white};
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
        <WhiteDot />
        OFF AIR
      </Container>
    )
  }
}

export default OnAirSign
