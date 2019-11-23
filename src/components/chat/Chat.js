import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'

import { H2, P, primaryFont } from '../styles/base'
import Flex from '../design-system/Flex'
import IconButton from '../design-system/IconButton'

import ChatMessage from './ChatMessage'

import SocketContext from '../contexts/socket-context/context'

const ChatContainer = styled.section`
  height: 100%;
  width: 300px;

  box-sizing: border-box;
  border: 2px solid #141414;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: white;
  background-color: rgba(15, 14, 15, 0.6);
  z-index: 100;
`

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
  const [isExpanded, setIsExpanded] = useState(true) // will be used to detemine if chat is open or closed
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

  if (isExpanded) {
    return (
      <ChatContainer>
        <ChatHeader>
          <IconButton
            data-tip='Collapse'
            onClick={() => {
              setIsExpanded(false)
            }}>
            <img
              src={process.env.PUBLIC_URL + '/img/right-collapse-icon.svg'}
              alt='collapse'
            />
          </IconButton>
          <P>Room Chat</P>
          <IconButton data-tip='Listener List' onClick={() => {}}>
            <img
              src={process.env.PUBLIC_URL + '/img/profile-icon-white.svg'}
              alt='listeners'
            />
          </IconButton>
          <ReactTooltip place='bottom' delayShow={100} />
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
  } else {
    return (
      <UnexpandedChatContainer>
        <IconButton
          data-tip='Expand'
          onClick={() => {
            setIsExpanded(true)
          }}>
          <img
            src={process.env.PUBLIC_URL + '/img/left-expand-icon.svg'}
            alt='expand'
          />
        </IconButton>
        <UnexpandedChatLabel>chat</UnexpandedChatLabel>
        <span></span>
        <ReactTooltip place='bottom' delayShow={100} />
      </UnexpandedChatContainer>
    )
  }
}

export default Chat
