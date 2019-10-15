import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Avatar from '../../design-system/Avatar'
import { H2 } from '../../styles/base'

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

function UserHeader(props) {
  const { userImageUrl, displayName } = props
  return (
    <Container>
      <Avatar
        source={userImageUrl}
        applyBorder={true}
        size='xxl'
        style={{ marginRight: '10px' }}
      />
      <H2>{displayName}</H2>
    </Container>
  )
}

UserHeader.propTypes = {
  userImageUrl: PropTypes.string,
  displayName: PropTypes.string
}

export default UserHeader
