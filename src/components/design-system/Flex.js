import React from 'react'
import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  justify-content: ${props => props.justifyContent || 'space-around'};
  flex-direction: ${props => props.flexDirection || 'column'};
  align-items: ${props => props.alignItems || 'inherit'};
  width: ${props => props.width || 'inherit'};
`
export default Flex
