import React from 'react'
import styled from 'styled-components'

const PeopleIcon = styled.img`
  width: 22px;
  height: 14px;
  margin-right: 10px;
`

const ViewCounter = props => {
  return (
    <section>
      <PeopleIcon src={process.env.PUBLIC_URL + '/img/profile-icon.png'} />
      {props.viewCount || 0}
    </section>
  )
}

export default ViewCounter
