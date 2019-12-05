import React from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

import { H2 } from '../styles/base'
import Flex from '../design-system/Flex'
import IconButton from '../design-system/IconButton'

const UnexpandedChatContainer = styled.section`
  height: 100%;
  width: 50px;

  box-sizing: border-box;
  border: 2px solid #141414;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: white;
  background-color: rgba(15, 14, 15, 0.6);
  z-index: 100;

  align-items: center;
  padding: 10px;
`

const UnexpandedChatLabel = styled(H2)`
  transform: rotate(-90deg);
`

function UnexpandedChat(props) {
  return (
    <UnexpandedChatContainer>
      <IconButton
        data-tip='Expand'
        onClick={() => {
          props.setIsExpanded(true)
        }}>
        <img
          src={process.env.PUBLIC_URL + '/img/left-expand-icon.svg'}
          alt='expand'
        />
      </IconButton>
      <Flex flexDirection='column' alignItems='center'>
        <UnexpandedChatLabel>chat</UnexpandedChatLabel>
        {props.isNewMesssage ? (
          <span
            style={{
              height: '10px',
              width: '10px',
              backgroundColor: 'yellow',
              borderRadius: '10px',
              marginTop: '15px'
            }}></span>
        ) : null}
      </Flex>
      <span></span>
      <ReactTooltip place='bottom' delayShow={100} />
    </UnexpandedChatContainer>
  )
}

export default UnexpandedChat
