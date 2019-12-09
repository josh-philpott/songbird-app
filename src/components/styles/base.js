import styled, { css } from 'styled-components'

export const grey = '#2B2A2A'
export const black = '#2A2A2A'
export const white = '#F2F1EB'
export const green = '#94d7a3'

export const sizings = {
  xs: '.5rem',
  s: '.8rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '2.2rem'
}

export const fontStack = css`
  font-family: Heebo, sans-serif;
`

export const primaryFont = `
  font-family: Heebo, sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: ${sizings.md}
  color: #FFFFFF;
`

export const H1 = styled.h1`
  ${fontStack};
  color: ${white};
  font-weight: 300;
  font-size: ${sizings.xl};
  line-height: 1.3;
  margin: 0;
  padding: 0;
`

export const H2 = styled.h1`
  ${fontStack};
  color: ${white};
  font-weight: 300;
  font-size: ${sizings.lg};
  line-height: 1.3;
  margin: 0;
  padding: 0;
`

export const P = styled.p`
  ${fontStack};
  font-style: normal;
  font-weight: 300;
  font-size: ${sizings.md};
  color: ${white};
`

export const buttonBase = `
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  border: 1px solid #FFFFFF;
  border-radius: 3px;
  box-sizing: border-box;
  background-color: inherit;

  ${primaryFont}

  :hover {
    background-color: #2a2a2a;
  }
`
