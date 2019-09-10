import styled from 'styled-components'
import { grey } from '../styles/base'

const Avatar = styled.img`
  border-radius: 50%;
  width: 35px;
  height: 35px;
  object-fit: cover;

  border: 1px solid ${grey};
`

export default Avatar
