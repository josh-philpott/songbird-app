import React, { useState } from 'react'
import styled from 'styled-components'

import { H2, P, primaryFont } from '../styles/base'

import ChatMessage from './ChatMessage'

const ChatContainer = styled.section`
  height: 100%;
  width: 100%;

  border-left: 2px solid #555555;

  display: flex;
  flex-direction: column;
`

const ChatHeader = styled.section`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #fffcfc;
  align-items: center;
`

const ChatMessagesContainer = styled.section`
  flex-grow: 1;
  overflow-y: scroll;
  scrollbar-color: grey;
`

const WriteMessageContainer = styled.section`
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  padding: 10px;
`

const MessageEditor = styled.input`
  box-sizing: border-box;
  border-radius: 6px;
  height: 46px;
  border: 2px solid #555555;
  background-color: #333333;
  ${primaryFont}
  width: 100%;
  padding: 0px 10px;
`

function Chat() {
  const [isOpen, setIsOpen] = useState(true) // will be used to detemine if chat is open or closed
  return (
    <ChatContainer>
      <ChatHeader>
        <H2>chat</H2>
      </ChatHeader>
      <ChatMessagesContainer>
        <ChatMessage>
          <P>angela.ma.nguyen</P>
          <P>this is chat message text!</P>
        </ChatMessage>
        <ChatMessage>
          <P>angela.ma.nguyen</P>
          <P>This is another chat message</P>
        </ChatMessage>
        <ChatMessage>
          <P>angela.ma.nguyen</P>
          <P> This is another chat message thats longer than the rest</P>
        </ChatMessage>
        <ChatMessage>
          <P>angela.ma.nguyen</P>
          <P> This is another chat message thats longer than the rest</P>
        </ChatMessage>
        <ChatMessage>
          <P>angela.ma.nguyen</P>
          <P> This is another chat message thats longer than the rest</P>
        </ChatMessage>
        <ChatMessage>
          <P>angela.ma.nguyen</P>
          <P> This is another chat message thats longer than the rest</P>
        </ChatMessage>
        <ChatMessage>
          <P>angela.ma.nguyen</P>
          <P> This is another chat message thats longer than the rest</P>
        </ChatMessage>
        <ChatMessage>
          <P>angela.ma.nguyen</P>
          <P> This is another chat message thats longer than the rest</P>
        </ChatMessage>
      </ChatMessagesContainer>
      <WriteMessageContainer>
        <MessageEditor placeholder='Type a message here' />
      </WriteMessageContainer>
    </ChatContainer>
  )
}

export default Chat
