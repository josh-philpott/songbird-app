import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { white, H2, primaryFont, P, A, buttonBase } from '../../styles/base'
import CopyLinkButton from './CopyLinkButton'
import ProgressBar from './ProgressBar'
import ViewerExpander from '../../ViewerExpander'
import UserHeader from './UserHeader'

import BroadcastStreamController from '../BroadcastStreamController'
import ProgressTicker from '../../../lib/playback-controller'

const PlayerContainer = styled.section`
  > * {
    margin-bottom: 10px;
  }
`
const PlayerInnerContainer = styled.section`
  width: 485px;
  min-width: 485px;
  height: 500;
  background-color: rgba(10, 10, 10, 0.9);
  border: 1px solid #ffffff;
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

const SecondRow = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 137px;
`

const AlbumArt = styled.img`
  height: 246px;
  width: 246px;
  margin: 0px auto;
`

const Header = styled(H2)`
  color: ${white};
`

const BottomRightContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0px auto;
  padding-left: 20px;
  flex-grow: 1;
  max-width: 330px;
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

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      currentSongInfo: {},
      currentlyPlaying: {},
      progressString: '',
      durationString: '',
      progress_ms: 0,
      duration_ms: 0,
      is_playing: false,
      isBroadcasting: true
    }
  }

  listenToTick(currentSongId, calculatedProgressMs, currentSongDurationMs) {
    this.setState({
      progress_ms: calculatedProgressMs,
      duration_ms: currentSongDurationMs
    })
  }

  setCurrentSongInfo(currentlyPlaying) {
    this.props.handleBroadcastStatusChange(true)
    let currentSongInfo = {}
    if (currentlyPlaying && currentlyPlaying.item) {
      currentSongInfo.name = currentlyPlaying.item.name
      currentSongInfo.artist = currentlyPlaying.item.artists[0].name
      currentSongInfo.albumArtUrl = currentlyPlaying.item.album.images[0].url
      currentSongInfo.progress_ms = currentlyPlaying.progress_ms
      currentSongInfo.duration_ms = currentlyPlaying.item.duration_ms
      this.setState({
        isLoading: false,
        currentSongInfo,
        currentlyPlaying,
        isBroadcasting: true
      })
    } else {
      this.setState({ isLoading: false, isBroadcasting: false })
    }
  }

  handleBroadcasterDisconnect() {
    console.log('broadcaster disconnected')
    this.setState({
      isBroadcasting: false
    })
    this.props.handleBroadcastStatusChange(false)
  }

  componentDidMount() {
    ProgressTicker.registerListener(this.listenToTick.bind(this))
  }
  render() {
    let urlBase = `${window.location.host}`
    return (
      <PlayerContainer>
        <PlayerInnerContainer>
          <TopRow>
            <UserHeader
              userImageUrl={this.props.profileImageUrl}
              displayName={this.props.profileDisplayName}
            />
            <CopyLinkButton
              shareLink={
                urlBase + `/listener?broadcastId=${this.props.broadcastId}`
              }
            />
          </TopRow>
          {this.state.isBroadcasting ? (
            <>
              {this.state.isLoading ? null : (
                <>
                  <AlbumArt src={this.state.currentSongInfo.albumArtUrl} />
                  <SongTitle>{this.state.currentSongInfo.name}</SongTitle>
                  <ArtistName>{this.state.currentSongInfo.artist}</ArtistName>
                  <ProgressBar
                    progress_ms={this.state.progress_ms}
                    duration_ms={this.state.duration_ms}
                  />
                  {this.props.isBroadcaster ? (
                    <SyncButton
                      onClick={() => {
                        this.props.toggleBroadcastEnabled()
                      }}>
                      {this.props.broadcastEnabled
                        ? 'Stop Broadcasting'
                        : 'Resume Broadcast'}
                    </SyncButton>
                  ) : null}
                </>
              )}
            </>
          ) : (
            <P>Nothing is playing...</P>
          )}
          <BroadcastStreamController
            streamUpdateHandler={this.setCurrentSongInfo.bind(this)}
            broadcasterDisconnectHandler={this.handleBroadcasterDisconnect.bind(
              this
            )}
            broadcastId={this.props.broadcastId}
            syncEnabled={this.props.syncEnabled}
            listenerProfileInfo={this.props.listenerProfileInfo}
            viewersUpdateHandler={this.props.handleViewersUpdate}
          />
        </PlayerInnerContainer>
        <ViewerExpander viewers={this.props.viewers} />
      </PlayerContainer>
    )
  }
}

export default Player

Player.propTypes = {
  broadcastId: PropTypes.string,
  handleBroadcastStatusChange: PropTypes.func,
  handleViewersUpdate: PropTypes.func,
  isBroadcaster: PropTypes.bool,
  syncEnabled: PropTypes.bool,
  listenerProfileInfo: PropTypes.object,
  profileImageUrl: PropTypes.string,
  profileDisplayName: PropTypes.string,
  toggleBroadcastEnabled: PropTypes.func,
  broadcastEnabled: PropTypes.bool
}
