import styled, { css } from 'styled-components'

export const fontStack = css`
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica', 'Segoe',
    sans-serif;
`

export const sizings = {
  xs: '.5rem',
  s: '.8rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '2.2rem'
}

export const colors = {
  grey: '#2B2A2A',
  black: '#2A2A2A',
  white: '#F2F1EB',
  green: '#94d7a3'
}

export const H1 = styled.h1`
  ${fontStack};
  color: ${colors.white};
  font-weight: 500;
  font-size: ${sizings.xl};
  line-height: 1.3;
  margin: 0;
  padding: 0;
`

export const H2 = styled.h1`
  ${fontStack};
  color: ${colors.white};
  font-weight: 500;
  font-size: ${sizings.lg};
  line-height: 1.3;
  margin: 0;
  padding: 0;
`

export const H3 = styled.h3`
  ${fontStack};
  color: ${colors.white};
  font-size: ${sizings.md};
  font-weight: 500;
  line-height: 1.3;
  margin: 0px;
`

export const H4 = styled.h4`
  ${fontStack};
  color: ${colors.white};
  font-weight: 500;
  font-size: ${sizings.s};
  line-height: 1.3;
  margin: 0px;
`

export const P = styled.p`
  ${fontStack};
  font-style: normal;
  font-weight: 300;
  font-size: ${props => props.size || sizings.md};
  color: ${colors.white};
  line-height: 1.3;
  margin: 0;
  padding: 0;
`
