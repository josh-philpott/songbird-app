import React from 'react'
import styled from 'styled-components'
import { primaryFont } from './styles/base'

const NavContainer = styled.section`
  height: 50px;
  width: 100vw;
  display: flex;
  border-bottom: 1px solid white;
  background-color: #2b2b2b;
`

const NavLinks = styled.section`
  display: flex;
  justify-content: space-between;
`
const NavInnerContainer = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 0px 80px;
  width: 100%;
  height: 100%;
`

const navLinkStyle = `
  height: 100%
  background-color: inherit;
  border:0px;
  ${primaryFont}
  font-size: 18px;
  font-weight: 400;
  :hover {
    font-style: bold
    font-weight: 500;
  }
`

const NavLogoButton = styled.button`
  display: flex;
  ${navLinkStyle}
  > * {
    margin-right: 10px;
  }

  > img {
    margin-top: -12px;
  }
  align-items: center;
`

const NavLinkButton = styled.button`
  ${navLinkStyle}
  align-self: flex-end;
  width: 130px;
`

function Navbar(props) {
  const navLinks = props.loggedIn ? (
    <NavLinks>
      <NavLinkButton>logout</NavLinkButton>
    </NavLinks>
  ) : (
    <NavLinks>
      <NavLinkButton>broadcast</NavLinkButton>
      <NavLinkButton>how it works</NavLinkButton>
    </NavLinks>
  )

  return (
    <NavContainer>
      <NavInnerContainer>
        <NavLogoButton>
          <img
            src={process.env.PUBLIC_URL + '/img/soundbridge-icon.svg'}
            style={{ height: '40px' }}
          />
          <span>soundbridge</span>
        </NavLogoButton>
        {navLinks}
      </NavInnerContainer>
    </NavContainer>
  )
}

export default Navbar
