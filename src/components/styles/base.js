import styled from 'styled-components'

export const grey = '#2B2A2A'
export const black = '#2A2A2A'
export const white = '#F2F1EB'
export const green = '#94d7a3'

export const primaryFont = `
  font-family: Heebo, sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  color: ${grey};
`

export const H1 = styled.h1`
  ${primaryFont}
  font-size:32px;
`
export const H2 = styled.h2`
  ${primaryFont}
  font-size:32px;
  font-size: 24px;
  line-height: 35px;
  margin: 0px;
`

export const P = styled.p`
  ${primaryFont}
  color: ${white}
`

export const buttonBase = `
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  border: 1px solid ${grey};
  border-radius: 3px;
  box-sizing: border-box;
  background-color: inherit;

  ${primaryFont}

  :hover {
    background-color: #e2ded2;
  }
`
