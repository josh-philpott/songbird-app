import React from 'react'
import styled from 'styled-components'
import { grey, primaryFont } from '../styles/base'

const Body = styled.section`
  display: flex;
  justify-content: space-between;

  height: 600px;
`

const Content = styled.section`
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

const SpotifyLoginLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-around;

  height: 45px;
  width: 240px;
  border-radius: 3px;

  ${primaryFont}

  border: 1px solid ${grey};
  text-decoration: none;
`

function HomeBody() {
  return (
    <Body>
      <img
        src={process.env.PUBLIC_URL + '/img/headphone-left.svg'}
        style={{ height: '600px', width: '200px', color: grey }}
      />
      <Content>
        <Title>Listen Together</Title>
        <Description>
          Broadcast your Spotify session to friends. Login, create a room, and
          share the link. Your friends will be listening right alongside. It's
          just like going back to the days of splitting headphones on the bus...
          except less Emo.
        </Description>
        <SpotifyLoginLink href='/login'>
          <img src={process.env.PUBLIC_URL + '/img/spotify-logo.svg'} />
          <p>login through Spotify</p>
        </SpotifyLoginLink>
      </Content>
      <img
        src={process.env.PUBLIC_URL + '/img/headphone-right.svg'}
        style={{ height: '600px', width: '200px', color: grey }}
      />
    </Body>
  )
}

export default HomeBody
