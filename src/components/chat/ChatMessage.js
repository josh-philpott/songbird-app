import React, { useState } from 'react'
import styled from 'styled-components'
import Avatar from '../design-system/Avatar'
import { H3, P } from '../styles/base'

const ChatMessageContainer = styled.section`
  box-sizing: border-box;
  width: 100%;
  padding: 15px;
  border-top: 1px solid #555555;
  display: flex;
  align-items: top;
`

const ChatMessageInner = styled.section`
  padding: 0px 10px;
`
function ChatMessage(props) {
  return (
    <ChatMessageContainer>
      <Avatar />
      <ChatMessageInner>{props.children}</ChatMessageInner>
    </ChatMessageContainer>
  )
}

export default ChatMessage
