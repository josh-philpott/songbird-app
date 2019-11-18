import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'

import { H3, P, primaryFont } from '../styles/base'
import Flex from '../design-system/Flex'

import ChatMessage from './ChatMessage'

import SocketContext from '../contexts/socket-context/context'

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
  height: 50px;
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

function Chat(props) {
  const [isOpen, setIsOpen] = useState(true) // will be used to detemine if chat is open or closed
  const [inputMessage, setInputMessage] = useState('')

  const { chatMessages, sendMessage } = useContext(SocketContext)
  let messagesEnd = null

  const onEditorChange = e => {
    setInputMessage(e.target.value)
  }

  const onEditorKeyDown = async e => {
    if (e.keyCode === 13 && inputMessage !== '') {
      sendMessage(inputMessage, props.user, props.broadcastId)
      setInputMessage('')
    }
  }

  //auto scroll chat on new message
  useEffect(() => {
    if (messagesEnd) {
      messagesEnd.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages])

  return (
    <ChatContainer>
      <ChatHeader>
        <P>Room Chat</P>
      </ChatHeader>
      <ChatMessagesContainer>
        {chatMessages.map(({ message, user }) => {
          return <ChatMessage user={user} message={message} />
        })}
        {chatMessages.length === 0 ? (
          <Flex
            width='100%'
            height='100%'
            alignItems='center'
            justifyContent='center'>
            <P style={{ color: '#888888' }}>There are no chat messages yet</P>
          </Flex>
        ) : null}
        <div ref={el => (messagesEnd = el)} />
      </ChatMessagesContainer>
      <WriteMessageContainer>
        <MessageEditor
          placeholder='Type a message here'
          onChange={onEditorChange}
          onKeyDown={onEditorKeyDown}
          value={inputMessage}
        />
      </WriteMessageContainer>
    </ChatContainer>
  )
}

export default Chat
