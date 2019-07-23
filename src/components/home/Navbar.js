import React from 'react'
import styled from 'styled-components'
import { primaryFont } from '../styles/base'

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

const navLinkStyle = `
  height: 100%
  background-color: inherit;
  border:0px;
  ${primaryFont}
`

const NavLogoButton = styled.button`
  ${navLinkStyle}
`

const NavLinkButton = styled.button`
  ${navLinkStyle}
  align-self: flex-end;
  margin-left: 50px;
`

function Navbar() {
  return (
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
  )
}

export default Navbar
