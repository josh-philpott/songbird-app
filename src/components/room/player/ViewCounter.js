import React from 'react'
import styled from 'styled-components'

import ProfilesIcon from '../../design-system/icons/ProfilesIcon'

const Row = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  * {
    margin-right: 10px;
  }
`

const ViewCounter = props => {
  return (
    <Row>
      <ProfilesIcon color='white' />
      {props.count || 0}
    </Row>
  )
}

export default ViewCounter
