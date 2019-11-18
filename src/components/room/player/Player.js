import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { white, H1, H2, primaryFont, P, A, buttonBase } from '../../styles/base'
import CopyLinkButton from './CopyLinkButton'
import ProgressBar from './ProgressBar'
import UserHeader from './UserHeader'
import Flex from '../../design-system/Flex'
import Button from '../../design-system/Button'

import SpotifyDropInController from '../SpotifyDropInController'
import CalculatedProgressProvider from '../../contexts/calculated-progress-context'
import CalculatedProgressContext from '../../contexts/calculated-progress-context/context'
import NothingIsPlaying from './NothingIsPlaying'
import BottomBar from './BottomBar'

const PlayerContainer = styled.section`
  > * {
    margin-bottom: 10px;
  }
`
const PlayerInnerContainer = styled.section`
  min-height: 480px;
  width: 485px;
  min-width: 485px;
  height: 500;
  background-color: rgba(241, 238, 234, 0.1);
  border: 2px solid rgba(241, 238, 234, 0.3); /*f1eeea at 30% opacity*/
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 16px 26px;
  padding-bottom: 0px;
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
  const [syncEnabled, setSyncEnabled] = useState(false)

  const toggleSyncEnabled = () => {
    setSyncEnabled(!syncEnabled)
  }

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
                            syncEnabled={syncEnabled}
                            listenerProfileInfo={props.listenerProfileInfo}
                            calculatedProgressMs={calculatedProgressMs}
                            broadcasterCurrentlyPlaying={currentlyPlaying}
                          />
                        ) : null}
                      </>
                    )}
                  </CalculatedProgressContext.Consumer>
                </CalculatedProgressProvider>
                <BottomBar
                  isBroadcaster={isBroadcaster}
                  broadcastEnabled={props.broadcastEnabled}
                  toggleBroadcastEnabled={props.toggleBroadcastEnabled}
                  toggleSyncEnabled={toggleSyncEnabled}
                  syncEnabled={syncEnabled}></BottomBar>
              </>
            )}
          </>
        ) : (
          <NothingIsPlaying />
        )}
      </PlayerInnerContainer>
    </PlayerContainer>
  )
}

export default Player

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
