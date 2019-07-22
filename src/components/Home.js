import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  background-color: #eae7de;
  height: 100vh;
  width: 100vw;
  position: absolute;
`

const Title = styled.h1`
  font-family: Heebo, sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 53px;
`

const NavContainer = styled.section`
  display: flex
  height: 50px
  width: 100vw
`

const NavInnerContainer = styled.section`
  border-bottom: 1px solid black;
  margin: 0px 80px;
  width: 100%;
`

const NavLogoButton = styled.button`
  height: 100%
  background-color: inherit;
  border: 1px solid red;
  font-family: Heebo, sans-serif;
  font-size: 16px;
  font-weight:300;
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
            <NavLogoButton>Can you hear me?</NavLogoButton>
          </NavInnerContainer>
        </NavContainer>
        <Title>Songbird</Title>
        <a href='/login'>Login With Spotify</a>
      </Wrapper>
    )
  }
}

export default Home
