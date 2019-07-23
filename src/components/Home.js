import React from 'react'
import styled from 'styled-components'

const grey = '#2B2A2A'

const navLinkStyle = `
  height: 100%
  background-color: inherit;
  font-family: Heebo, sans-serif;
  font-size: 16px;
  font-weight:300;
  color: ${grey};
  border:0px;
`

const primaryFont = `
  font-family: Heebo, sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  color: ${grey};
`

const Wrapper = styled.section`
  background-color: #eae7de;
  height: 100vh;
  width: 100vw;
  position: absolute;
`

const WhatItDo = styled.section`
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

const NavContainer = styled.section`
  height: 50px
  width: 100vw
  display: flex
`

const NavLinks = styled.section`
  display: flex;
  justify-content: space-between;
`
const NavInnerContainer = styled.section`
  display: flex
  justify-content: space-between
  border-bottom: 1px solid black;
  margin: 0px 80px;
  width: 100%;
  height: 100%;
`

const NavLogoButton = styled.button`
  ${navLinkStyle}
`

const NavLinkButton = styled.button`
  ${navLinkStyle}
  align-self: flex-end;
  margin-left: 50px;
`

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {}

  render() {
    return (
      <Wrapper>
        <NavContainer>
          <NavInnerContainer>
            <NavLogoButton>can you hear me?</NavLogoButton>
            <NavLinks>
              <NavLinkButton>login</NavLinkButton>
              <NavLinkButton>how it works</NavLinkButton>
              <NavLinkButton>contact</NavLinkButton>
            </NavLinks>
          </NavInnerContainer>
        </NavContainer>
        <WhatItDo>
          <Title>Share Music Together</Title>
          <Description>
            Are you hearing me? provides a cohesive listening experience for
            your friends by connecting your spotify accounts. The broadcaster
            has control while the listeners can sit back and enjoy the
            experience.
          </Description>
          <a href='/login'>
            <SpotifyLoginButton>
              <img src={process.env.PUBLIC_URL + '/img/spotify-logo.svg'} />
              login through Spotify
            </SpotifyLoginButton>
          </a>
        </WhatItDo>
      </Wrapper>
    )
  }
}

export default Home
