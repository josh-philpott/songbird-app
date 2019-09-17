import styled from 'styled-components'
import { grey, sizings } from '../styles/base'

const Avatar = styled.img`
  border-radius: 50%;
  width: ${props => sizings[props.size] || sizings.lg};
  height: ${props => sizings[props.size || sizings.lg]};
  object-fit: cover;
  border: ${props => (props.applyBorder ? `1px solid #FFFFFF` : null)};
  box-shadow: 0 0 1px transparent; /* trick to anti-alias 1px border */
`

export default Avatar
