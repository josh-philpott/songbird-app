import React from 'react'
import Avatar from './design-system/Avatar'

import styled from 'styled-components'
import ProfilesIcon from './design-system/icons/ProfilesIcon'

const ViewerContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  .item {
    transition-timing-function: ease-in-out;
    transition-duration: 0.25s;
  }

  :hover {
    .item {
      transform: translate3d(var(--translate-distance), 0, 0);
      backface-visibility: hidden;
    }
  }

  .item {
    margin-right: -15px;
  }

  .item-1 {
    margin-left: 5px;
    --translate-distance: 0px;
    z-index: 10;
  }

  .item-2 {
    --translate-distance: 20px;
    z-index: 9;
  }

  .item-3 {
    --translate-distance: 40px;
    z-index: 8;
  }

  .item-4 {
    --translate-distance: 60px;
    z-index: 7;
  }
`

function ViewerExpander(props) {
  return (
    <ViewerContainer>
      <ProfilesIcon className='profileIcon' color='white' />
      {props.viewers.map(function(viewer, index) {
        return (
          <Avatar
            src={viewer.profileImageUrl}
            alt={viewer.name}
            title={viewer.name}
            key={index}
            size='sm'
            applyBorder={true}
            className={['item-' + (index + 1), 'item']}
          />
        )
      })}
    </ViewerContainer>
  )
}

export default ViewerExpander
