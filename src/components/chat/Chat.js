import React, { useState } from 'react'
import styled from 'styled-components'

import { H2, P, primaryFont } from '../styles/base'

import ChatMessage from './ChatMessage'

import broadcastApi from '../../lib/broadcast'

const ChatContainer = styled.section`
  height: 100%;
  width: 100%;

  border: 2px solid #141414;

  display: flex;
  flex-direction: column;
  color: white;
  background-color: rgba(15, 14, 15, 0.6);
`

const ChatHeader = styled.section`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid;
  border-bottom-color: rgba(255, 252, 252, 0.5);
  align-items: center;
`

const ChatMessagesContainer = styled.section`
  flex-grow: 1;
  overflow-y: scroll;
  scrollbar-color: grey;
  padding: 0px;
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

  :focus {
    outline: none !important;
  }
`

function Chat() {
  const [isOpen, setIsOpen] = useState(true) // will be used to detemine if chat is open or closed
  const [inputMessage, setInputMessage] = useState('')

  const onEditorChange = e => {
    setInputMessage(e.target.value)
  }

  const onEditorKeyUp = async e => {
    if (e.keyCode === 13) {
      await broadcastApi.sendMessage(inputMessage)
      setInputMessage('')
    }
  }

  return (
    <ChatContainer>
      <ChatHeader>
        <H2>chat</H2>
      </ChatHeader>
      <ChatMessagesContainer>
        <ChatMessage
          userName={'Josh Philpott'}
          message={'this is a chat messages'}
        />
        <ChatMessage
          userName={'Josh Philpott'}
          message={'This is another chat message'}
        />
        <ChatMessage
          userName={'Josh Philpott'}
          message={'his is another chat message thats longer than the rest'}
        />
        <ChatMessage
          userName={'Josh Philpott'}
          message={'his is another chat message thats longer than the rest'}
        />
        <ChatMessage
          userName={'Josh Philpott'}
          message={'his is another chat message thats longer than the rest'}
        />
        <ChatMessage
          userName={'Josh Philpott'}
          message={'his is another chat message thats longer than the rest'}
        />
        <ChatMessage
          userName={'Josh Philpott'}
          message={'his is another chat message thats longer than the rest'}
        />
        <ChatMessage
          userName={'Josh Philpott'}
          message={'his is another chat message thats longer than the rest'}
        />
        <ChatMessage
          userName={'Josh Philpott'}
          message={'his is another chat message thats longer than the rest'}
        />
        <ChatMessage
          userName={'Josh Philpott'}
          message={'his is another chat message thats longer than the rest'}
        />
      </ChatMessagesContainer>
      <WriteMessageContainer>
        <MessageEditor
          placeholder='Type a message here'
          onChange={onEditorChange}
          onKeyUp={onEditorKeyUp}
          value={inputMessage}
        />
      </WriteMessageContainer>
    </ChatContainer>
  )
}

export default Chat
