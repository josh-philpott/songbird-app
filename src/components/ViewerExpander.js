import React from 'react'
import Avatar from './design-system/Avatar'

function ViewerExpander(props) {
  return (
    <>
      {props.viewers.map(function(viewer, index) {
        console.log(viewer.imageUrl)
        return (
          <Avatar
            src={viewer.profileImageUrl}
            alt={viewer.name}
            style={{ margin: '10px' }}
          />
        )
      })}
    </>
  )
}

export default ViewerExpander
