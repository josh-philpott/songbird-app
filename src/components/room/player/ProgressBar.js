import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { white } from '../../styles/base'
import PropTypes from 'prop-types'

const ProgressContainer = styled.section`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: ${white};
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ProgressBarInner = styled.progress`
  flex-grow: 1;
  margin: 0px 10px;
`

const ProgressBar = props => {
  const [calculatedProgressMs, setCalculatedProgressMs] = useState(0)
  const calculatedProgressMsRef = useRef(calculatedProgressMs)
  calculatedProgressMsRef.current = calculatedProgressMs

  useEffect(() => {
    setCalculatedProgressMs(props.progressMs)
  }, [props.progressMs, props.durationMs, props.isPlaying])

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        props.isPlaying &&
        !(calculatedProgressMsRef.current + 1000 > props.durationMs)
      ) {
        setCalculatedProgressMs(calculatedProgressMsRef.current + 1000)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const msToTimeString = ms => {
    if (!ms) ms = 0
    const totalSeconds = Math.floor(ms / 1000)
    const seconds = totalSeconds % 60
    const minutes = Math.floor(totalSeconds / 60)

    let secondsString = seconds < 10 ? `0${seconds}` : seconds.toString()
    return `${minutes}:${secondsString}`
  }

  return (
    <ProgressContainer>
      <p>{msToTimeString(calculatedProgressMs)}</p>
      <ProgressBarInner
        value={calculatedProgressMs || 0}
        max={props.durationMs || 0}
      />
      <p>{msToTimeString(props.durationMs)}</p>
    </ProgressContainer>
  )
}

ProgressBar.propTypes = {
  progressMs: PropTypes.number,
  durationMs: PropTypes.number,
  isPlaying: PropTypes.bool
}

export default ProgressBar
