import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'

import { H1, H2, P } from '../styles/base'
import Flex from '../design-system/Flex'
import Room from '../room/Room'
import Chat from '../chat/Chat'
import SocketContext from '../contexts/socket-context/context'
import UserContext from '../contexts/user-context/context'
import CopyLinkButton from '../room/player/CopyLinkButton'
const PageContainer = styled.section`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;

  /*background-image: radial-gradient(
    circle 274px at 7.4% 17.9%,
    rgba(82, 107, 248, 1) 0.3%,
    rgba(167, 139, 252, 1) 90.5%
  );*/

  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(40, 30, 30, 1) 0%,
    rgba(30, 30, 30, 1) 40%,
    rgba(15, 15, 15, 1) 90%
  );

  /** I really like this gradient I commented out
  background: #a8ff78; /* fallback for old browsers */
  /**background: -webkit-linear-gradient(
    to right,
    #78ffd6,
    #a8ff78
  ); /* Chrome 10-25, Safari 5.1-6 */
  /**background: linear-gradient(
    to right,
    #78ffd6,
    #a8ff78
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`

const NoiseOverlay = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  background-repeat: repeat;
  background-image: url(${process.env.PUBLIC_URL + '/img/otis-redding.png'});
  opacity: 0.1;
`

const RoomContainer = styled.section`
  height: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  z-index: 100;
`

function ListenerPageInner(props) {
  const [isLoading, setIsLoading] = useState(true)

  const Socket = useContext(SocketContext)
  const User = useContext(UserContext)

  /**
   * broadcastEnabled indicates if the broadcaster is sending stream updates or not
   */
  useEffect(() => {
    if (User.id !== '') {
      Socket.subscribeAsListener(props.broadcastId, {
        id: User.id,
        name: User.display_name,
        imageUrl: User.imageUrl
      })
      setIsLoading(false)
    }
  }, [User])

  if (isLoading) {
    return <H1>Loading...</H1>
  } else {
    return (
      <>
        <PageContainer>
          <RoomContainer>
            <Flex
              height='50px'
              width='100%'
              flexDirection='row'
              justifyContent='space-between'
              style={{ padding: '0px 20px' }}>
              <P
                style={{
                  fontSize: '20px',
                  fontWeight: 'light',
                  color: '#F1EEEA'
                }}>
                soundbridge
              </P>
              <CopyLinkButton
                shareLink={
                  window.location.host +
                  `/listener?broadcastId=${props.broadcastId}`
                }
              />
            </Flex>
            <Flex
              flexDirection='row'
              alignItems='center'
              justifyContent='center'
              style={{ flexGrow: 1, width: '100%' }}>
              <Room
                isBroadcaster={false}
                broadcastMeta={Socket.broadcastMeta}
                currentlyPlaying={Socket.currentlyPlaying}
                viewers={Socket.viewers}
              />
            </Flex>
          </RoomContainer>
          <Chat user={User} broadcastId={props.broadcastId} />
        </PageContainer>
        <NoiseOverlay />
      </>
    )
  }
}

export default ListenerPageInner
