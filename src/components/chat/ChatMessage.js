import React, { useState } from 'react'
import styled from 'styled-components'
import Avatar from '../design-system/Avatar'
import { H3, P, primaryFont } from '../styles/base'

const ChatMessageContainer = styled.section`
  box-sizing: border-box;
  width: 100%;
  padding: 15px;
  border-top: 1px solid;
  border-top-color: rgba(255, 252, 252, 0.1);
  display: flex;
  align-items: top;
`

const ChatMessageInner = styled.section`
  max-width: 80%;
  padding: 0px 15px;
`

const UserName = styled.h3`
  font-family: Heebo, sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: #f1eeea;
  margin: 0px;
`

const Message = styled(P)`
  font-weight: 300;
  font-size: 14px;
  padding: 0px;
  margin-top: 3px;
  margin-bottom: 0px;
  overflow-wrap: break-word;
`
function ChatMessage(props) {
  const { message, user } = props
  return (
    <ChatMessageContainer>
      <Avatar size='xxl' source={user.imageUrl} />
      <ChatMessageInner>
        <UserName>{user.displayName}</UserName>
        <Message>{message}</Message>
      </ChatMessageInner>
    </ChatMessageContainer>
  )
}

export default ChatMessage
