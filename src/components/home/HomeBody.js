import React from 'react'
import styled from 'styled-components'
import { primaryFont } from '../styles/base'

const BodyWrapper = styled.section`
  width: 680px;
  height: 240px;
  margin: 150px auto;
`

const Title = styled.h1`
  ${primaryFont}
  font-size: 36px;
  margin: 0px;
`

const Description = styled.p`
  ${primaryFont}
  margin: 30px 0px;
`

const SpotifyLoginButton = styled.button`
  ${primaryFont}
  height: 45px;
  width: 240px;
  background-color: inherit;
  border-radius: 3px;
`

function HomeBody() {
  return (
    <BodyWrapper>
      <Title>Share Music Together</Title>
      <Description>
        Are you hearing me? provides a cohesive listening experience for your
        friends by connecting your spotify accounts. The broadcaster has control
        while the listeners can sit back and enjoy the experience.
      </Description>
      <a href='/login'>
        <SpotifyLoginButton>
          <img src={process.env.PUBLIC_URL + '/img/spotify-logo.svg'} />
          login through Spotify
        </SpotifyLoginButton>
      </a>
    </BodyWrapper>
  )
}

export default HomeBody
