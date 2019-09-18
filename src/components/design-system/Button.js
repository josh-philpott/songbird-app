import React from 'react'
import styled from 'styled-components'
import { primaryFont } from '../styles/base'

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  border: 1px solid #ffffff;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: inherit;
  padding: 10px 20px;

  ${primaryFont}

  :hover {
    background-color: #2a2a2a;
  }
`

export default Button
