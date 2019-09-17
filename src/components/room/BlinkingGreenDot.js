import React from 'react'

import { grey, green } from '../styles/base'
import Dot from '../Dot'

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
    const dotColor = this.state.dotOn ? green : grey
    return <Dot color={dotColor} />
  }
}

export default BlinkingGreenDot
