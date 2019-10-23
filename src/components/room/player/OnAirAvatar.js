import React from 'react'
import styled from 'styled-components'

import Avatar from '../../design-system/Avatar'

const OuterCircle = styled.section`
  height: 46px;
  width: 46px;
  border-radius: 23px;
  background-color: blue;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 10px;

  background-image: linear-gradient(-45deg, #0250c5 0%, #d43f8d 100%);
  background-image: linear-gradient(-45deg, #0250c5 0%, #d43f8d 100%);
`

function OnAirAvatar(props) {
  return (
    <OuterCircle>
      <Avatar
        size='xxl'
        source='https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/33748780_10155366585941366_7866216603870822400_n.jpg?_nc_cat=111&_nc_oc=AQn6ZmoQyySKHlPBE4T1VAsNeArBer8VXaUuGzb5vTh5oQ5M7nyf4rCMjIbGSvOBTkE&_nc_ht=scontent.xx&oh=25e31615788e90b5ef1b8644be637633&oe=5E28225E'
      />
    </OuterCircle>
  )
}

export default OnAirAvatar
