import React, { useState, useEffect } from 'react'
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

const calculateTimeString = ms => {
  if (!ms) ms = 0
  const totalSeconds = Math.floor(ms / 1000)
  const seconds = totalSeconds % 60
  const minutes = Math.floor(totalSeconds / 60)

  let secondsString = seconds < 10 ? `0${seconds}` : seconds.toString()
  return `${minutes}:${secondsString}`
}

const ProgressBar = props => {
  const [durationString, setDurationString] = useState(0)
  const [progressString, setProgressString] = useState(0)

  useEffect(() => {
    setProgressString(calculateTimeString(props.progress_ms))
    setDurationString(calculateTimeString(props.duration_ms))
  }, [props.progress_ms, props.duration_ms])

  return (
    <ProgressContainer>
      <p>{progressString}</p>
      <ProgressBarInner
        value={props.progress_ms || 0}
        max={props.duration_ms || 0}
      />
      <p>{durationString}</p>
    </ProgressContainer>
  )
}

ProgressBar.propTypes = {
  progress_ms: PropTypes.number,
  duration_ms: PropTypes.number
}

export default ProgressBar
