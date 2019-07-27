import React from 'react'

import styled from 'styled-components'
import { grey } from '../styles/base'

const Dot = styled.section`
  height: 6px;
  width: 6px;
  border-radius: 50%;
  margin-right: 5px;
`
const GreenDot = styled(Dot)`
  background-color: #94d7a3;
`

const GreyDot = styled(Dot)`
  background-color: ${grey};
`

const ON_TIME = 1000
const OFF_TIME = 500

class BlinkingGreenDot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dotOn: true
    }
  }

  blink() {
    const nextDotState = !this.state.dotOn
    this.setState({ dotOn: nextDotState })

    const time = nextDotState ? ON_TIME : OFF_TIME

    setTimeout(this.blink.bind(this), time)
  }

  async componentDidMount() {
    setTimeout(this.blink.bind(this), 800)
  }

  render() {
    return this.state.dotOn ? <GreenDot /> : <GreyDot />
  }
}

export default BlinkingGreenDot
