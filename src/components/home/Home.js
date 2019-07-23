import React from 'react'
import styled from 'styled-components'

import Navbar from './Navbar'
import HomeBody from './HomeBody'

const Wrapper = styled.section`
  background-color: #eae7de;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`

function Home() {
  return (
    <Wrapper>
      <Navbar />
      <HomeBody />
    </Wrapper>
  )
}

export default Home
