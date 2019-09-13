import React from 'react'
import styled from 'styled-components'

import Navbar from './Navbar'
import HomeBody from './HomeBody'
import PulsingGradientBackground from '../PulsingGradientBackground'

import { primaryFont } from '../styles/base'

const Wrapper = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`

const Footer = styled.section`
  margin-top: auto;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  ${primaryFont}
`

const A = styled.a`
  ${primaryFont}
`

function Home() {
  return (
    <Wrapper>
      <PulsingGradientBackground />
      <Navbar />
      <HomeBody />
      <Footer>
        <span>
          Made with ♥ by <A href='#'>JuneDaze</A> + <A href='#'>Josh</A>
        </span>
      </Footer>
    </Wrapper>
  )
}

export default Home
