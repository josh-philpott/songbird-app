import React, { createContext } from 'react'

const UserContext = createContext({
  id: '',
  displayName: '',
  imageUrl: ''
})

export default UserContext
