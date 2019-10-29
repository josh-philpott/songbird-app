import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'

import { H2, P, primaryFont } from '../styles/base'

import ChatMessage from './ChatMessage'

import SocketContext from '../socket_context/context'

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

  const { chatMessages, sendMessage } = useContext(SocketContext)
  let messagesEnd = null

  const onEditorChange = e => {
    setInputMessage(e.target.value)
  }

  const onEditorKeyUp = async e => {
    if (e.keyCode === 13 && inputMessage !== '') {
      sendMessage(inputMessage)
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
        <H2>chat</H2>
      </ChatHeader>
      <ChatMessagesContainer>
        {chatMessages.map(message => {
          return <ChatMessage userName='Josh Philpott' message={message} />
        })}
        {chatMessages.length === 0 ? <P>Ain't no chat messages yet</P> : null}
        <div ref={el => (messagesEnd = el)} />
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
