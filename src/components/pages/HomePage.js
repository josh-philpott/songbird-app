import React from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Cookies from 'js-cookie'

import Navbar from '../Navbar'
import HomeBody from '../home/HomeBody'
import PulsingGradientBackground from '../PulsingGradientBackground'
import Flex from '../design-system/Flex'
import { P } from '../styles/base'

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

function HomePage() {
  if (
    Cookies.get('spotify_access_token') ||
    Cookies.get('spotify_refresh_token')
  ) {
    return <Redirect to='/dashboard' />
  }
  return (
    <Wrapper>
      <Flex
        height='50px'
        width='100%'
        flexDirection='row'
        justifyContent='flex-start'
        style={{ padding: '0px 20px' }}>
        <P
          style={{
            fontSize: '20px',
            fontWeight: 'light',
            color: '#F1EEEA'
          }}>
          soundbridge
        </P>
      </Flex>
      <HomeBody />
      <Footer>
        <span>
          Made with ♥ by <A href='#'>JuneDaze</A> +{' '}
          <A href='https://www.josh-philpott.com'>Josh</A>
        </span>
      </Footer>
    </Wrapper>
  )
}

export default HomePage
