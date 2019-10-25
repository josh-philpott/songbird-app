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
`
function ChatMessage(props) {
  return (
    <ChatMessageContainer>
      <Avatar
        size='xxl'
        source='https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/33748780_10155366585941366_7866216603870822400_n.jpg?_nc_cat=111&_nc_oc=AQn6ZmoQyySKHlPBE4T1VAsNeArBer8VXaUuGzb5vTh5oQ5M7nyf4rCMjIbGSvOBTkE&_nc_ht=scontent.xx&oh=25e31615788e90b5ef1b8644be637633&oe=5E28225E'
      />
      <ChatMessageInner>
        <UserName>{props.userName}</UserName>
        <Message>{props.message}</Message>
      </ChatMessageInner>
    </ChatMessageContainer>
  )
}

export default ChatMessage
