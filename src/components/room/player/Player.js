import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { white, H2, primaryFont, P, A, buttonBase } from '../../styles/base'
import CopyLinkButton from './CopyLinkButton'
import ProgressBar from './ProgressBar'
import UserHeader from './UserHeader'
import Flex from '../../design-system/Flex'

import SpotifyDropInController from '../SpotifyDropInController'
import CalculatedProgressProvider from '../../contexts/calculated-progress-context'
import CalculatedProgressContext from '../../contexts/calculated-progress-context/context'

const PlayerContainer = styled.section`
  > * {
    margin-bottom: 10px;
  }
`
const PlayerInnerContainer = styled.section`
  height: 485px;
  width: 485px;
  min-width: 485px;
  height: 500;
  background-color: rgba(241, 238, 234, 0.1);
  border: 2px solid rgba(241, 238, 234, 0.3); /*f1eeea at 30% opacity*/
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 16px 26px;
`
const TopRow = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
  color: ${white};
`

const AlbumArt = styled.img`
  height: 246px;
  width: 246px;
  margin: 0px auto;
`

const SongTitle = styled.h3`
  ${primaryFont}
  font-weight:500;
  font-size: 24px;
  line-height: 2;
  color: ${white};
  margin: 0px auto;

  max-width: 345px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const ArtistName = styled.p`
  ${primaryFont}
  color: ${white};
  margin: 0px auto;

  max-width: 345px;
  text-align:center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const TopContainer = styled.section`
  display: flex;
  flex-direction: column;
`

const SyncButton = styled.button`
  width: 238px;
  height: 44px;
  ${buttonBase}
  margin: 0px auto;
`

function Player(props) {
  let urlBase = `${window.location.host}`

  const { currentlyPlaying, isBroadcaster } = props
  const {
    broadcastId,
    profileImageUrl: broadcasterProfileImageUrl,
    displayName: broadcasterDisplayName
  } = props.broadcastMeta

  const [isLoading, setIsLoading] = useState(true)
  const [currentSongInfo, setCurrentSongInfo] = useState({})
  const [isBroadcasting, setIsBroadcasting] = useState(true)

  useEffect(() => {
    console.log('setting currentSongInfo')
    let currentSongInfo = {}
    if (currentlyPlaying && currentlyPlaying.item) {
      currentSongInfo.id = currentlyPlaying.item.id
      currentSongInfo.name = currentlyPlaying.item.name
      currentSongInfo.artist = currentlyPlaying.item.artists[0].name
      currentSongInfo.albumArtUrl = currentlyPlaying.item.album.images[0].url
      currentSongInfo.progressMs = currentlyPlaying.progress_ms
      currentSongInfo.durationMs = currentlyPlaying.item.duration_ms
      currentSongInfo.isPlaying = currentlyPlaying.is_playing
      console.log('albumArtUrl: ', currentSongInfo.albumArtUrl)

      setIsLoading(false)
      setCurrentSongInfo(currentSongInfo)
      setIsBroadcasting(true)
    } else {
      setIsLoading(false)
      setIsBroadcasting(false)
    }
  }, [currentlyPlaying])

  return (
    <PlayerContainer>
      <PlayerInnerContainer>
        <TopRow>
          <UserHeader
            userImageUrl={broadcasterProfileImageUrl}
            displayName={broadcasterDisplayName}
          />
          <CopyLinkButton
            shareLink={urlBase + `/listener?broadcastId=${broadcastId}`}
          />
        </TopRow>
        {isBroadcasting ? (
          <>
            {isLoading ? null : (
              <>
                <AlbumArt src={currentSongInfo.albumArtUrl} />
                <SongTitle>{currentSongInfo.name}</SongTitle>
                <ArtistName>{currentSongInfo.artist}</ArtistName>
                <CalculatedProgressProvider>
                  <CalculatedProgressContext.Consumer>
                    {({ setCalculatedProgressMs, calculatedProgressMs }) => (
                      <>
                        <ProgressBar
                          progressMs={currentSongInfo.progressMs}
                          durationMs={currentSongInfo.durationMs}
                          isPlaying={currentSongInfo.isPlaying}
                          updateCalculatedProgressContext={
                            setCalculatedProgressMs
                          }
                        />
                        {!props.isBroadcaster ? (
                          <SpotifyDropInController
                            broadcastId={broadcastId}
                            syncEnabled={props.syncEnabled}
                            listenerProfileInfo={props.listenerProfileInfo}
                            calculatedProgressMs={calculatedProgressMs}
                            broadcasterCurrentlyPlaying={currentlyPlaying}
                          />
                        ) : null}
                      </>
                    )}
                  </CalculatedProgressContext.Consumer>
                </CalculatedProgressProvider>
                {isBroadcaster ? (
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
                ) : null}
              </>
            )}
          </>
        ) : (
          <P>Nothing is playing...</P>
        )}
      </PlayerInnerContainer>
    </PlayerContainer>
  )
}

export default Player
//      <ViewerExpander viewers={props.viewers} />

Player.propTypes = {
  broadcastMeta: PropTypes.object,
  currentlyPlaying: PropTypes.object,
  handleBroadcastStatusChange: PropTypes.func,
  handleViewersUpdate: PropTypes.func,
  isBroadcaster: PropTypes.bool,
  syncEnabled: PropTypes.bool,
  listenerProfileInfo: PropTypes.object,
  toggleBroadcastEnabled: PropTypes.func,
  broadcastEnabled: PropTypes.bool
}
