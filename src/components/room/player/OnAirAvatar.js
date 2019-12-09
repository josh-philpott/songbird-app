import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import Avatar from '../../design-system/Avatar'

const OuterCircle = styled.section`
  height: 42px;
  width: 42px;
  border-radius: 21px;
  background-color: blue;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 10px;

  background-image: linear-gradient(
    ${props => props.degree},
    #0250c5 0%,
    #d43f8d 100%
  );
  background-image: linear-gradient(
    ${props => props.degree},
    #0250c5 0%,
    #d43f8d 100%
  );
`

function OnAirAvatar(props) {
  const [degree, setDegree] = useState(0)
  const degreeRef = useRef(degree)
  degreeRef.current = degree

  function rotateGradient() {
    degreeRef.current = degreeRef.current >= 359 ? 0 : degreeRef.current + 1
    setDegree(degreeRef.current)
  }

  useEffect(() => {
    setInterval(rotateGradient, 10)
  }, [])

  return (
    <OuterCircle degree={degree + 'deg'}>
      <Avatar size='xxl' source={props.source} />
    </OuterCircle>
  )
}

export default OnAirAvatar
