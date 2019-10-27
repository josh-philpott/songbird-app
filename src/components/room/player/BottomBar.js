import React from 'react'
import styled from 'styled-components'
import Flex from '../../design-system/Flex'
import Button from '../../design-system/Button'
import { buttonBase } from '../../styles/base'

const SyncButton = styled.button`
  width: 200px;
  height: 44px;
  ${buttonBase}
  margin: 0px auto;
  outline: none;
`

const IconButton = styled.button`
  height: 44px;
  text-align: center;
  ${buttonBase}
  outline: none;
  border: none;
  margin: 0px auto;
`

const BottomBarRightSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100px;
`

function BottomBar(props) {
  return (
    <Flex flexDirection='row' width='100%'>
      <Flex
        flexDirection='row'
        alignItems='center'
        justifyContent='flexStart'
        width='100px'>
        {props.isBroadcaster ? null : (
          <img
            src={process.env.PUBLIC_URL + '/img/sound-icon.svg'}
            alt='sound'
          />
        )}
      </Flex>
      {props.isBroadcaster ? (
        <SyncButton
          onClick={() => {
            props.toggleBroadcastEnabled()
          }}>
          {props.broadcastEnabled ? (
            <Flex
              justifyContent='space-evenly'
              alignItems='center'
              flexDirection='row'
              width='100%'>
              <div
                style={{
                  height: '15px',
                  width: '15px',
                  backgroundColor: 'white'
                }}
              />
              <span>Stop Broadcasting</span>
            </Flex>
          ) : (
            'Resume Broadcast'
          )}
        </SyncButton>
      ) : props.syncEnabled ? (
        <IconButton onClick={props.toggleSyncEnabled}>
          <img
            src={process.env.PUBLIC_URL + '/img/pause-icon.svg'}
            alt='pause'
          />
        </IconButton>
      ) : (
        <IconButton onClick={props.toggleSyncEnabled}>
          <img src={process.env.PUBLIC_URL + '/img/play-icon.svg'} alt='play' />
        </IconButton>
      )}

      <Flex
        flexDirection='row'
        alignItems='center'
        justifyContent='flex-end'
        width='100px'>
        <img
          src={process.env.PUBLIC_URL + '/img/emoji-icon.svg'}
          style={{ height: '15px', marginRight: '15px' }}
        />
        <img
          src={process.env.PUBLIC_URL + '/img/history-icon.svg'}
          style={{ height: '11px' }}
        />
      </Flex>
    </Flex>
  )
}

export default BottomBar
