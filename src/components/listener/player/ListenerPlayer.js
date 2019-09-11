import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { white, H2, primaryFont, P } from '../../styles/base'
import ViewCounter from './ViewCounter'
import ProgressBar from './ProgressBar'
import ViewerExpander from '../../ViewerExpander'

import ListenerStreamController from '../ListenerStreamController'

const PlayerContainer = styled.section`
  width: 480px;
  margin: 50px auto;
  > * {
    margin-bottom: 10px;
  }
`
const Player = styled.section`
  width: 100%;
  height: 220px;
  background-color: #2a2a2a;
  border: 1px solid #000000;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 16px 26px;
`
const TopRow = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 28px;
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
  height: 137px;
  width: 137px;
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
  margin: 0px;

  max-width: 345px;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const ArtistName = styled.p`
  ${primaryFont}
  color: ${white};
  margin: 0px;

  max-width: 345px;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const TopContainer = styled.section`
  display: flex;
  flex-direction: column;
`

class ListenerPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      currentSongInfo: {},
      currentlyPlaying: {},
      progressString: '',
      durationString: '',
      isBroadcasting: true
    }
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

  render() {
    return (
      <PlayerContainer>
        <Player>
          <TopRow>
            <Header>Currently Broadcasting</Header>
            <ViewCounter count={this.props.viewers.length} />
          </TopRow>
          {this.state.isBroadcasting ? (
            <>
              {this.state.isLoading ? null : (
                <SecondRow>
                  <AlbumArt src={this.state.currentSongInfo.albumArtUrl} />
                  <BottomRightContainer>
                    <TopContainer>
                      <SongTitle>{this.state.currentSongInfo.name}</SongTitle>
                      <ArtistName>
                        {this.state.currentSongInfo.artist}
                      </ArtistName>
                    </TopContainer>
                    <ProgressBar
                      progress_ms={this.state.currentSongInfo.progress_ms}
                      duration_ms={this.state.currentSongInfo.duration_ms}
                      is_playing={this.state.currentlyPlaying.is_playing}
                    />
                  </BottomRightContainer>
                </SecondRow>
              )}
            </>
          ) : (
            <P>Nothing is playing...</P>
          )}
          <ListenerStreamController
            streamUpdateHandler={this.setCurrentSongInfo.bind(this)}
            broadcasterDisconnectHandler={this.handleBroadcasterDisconnect.bind(
              this
            )}
            broadcastId={this.props.broadcastId}
            syncEnabled={this.props.syncEnabled}
            listenerProfileInfo={this.props.listenerProfileInfo}
            viewersUpdateHandler={this.props.handleViewersUpdate}
          />
        </Player>
        <ViewerExpander viewers={this.props.viewers} />
      </PlayerContainer>
    )
  }
}

export default ListenerPlayer

ListenerPlayer.propTypes = {
  broadcastId: PropTypes.string,
  handleBroadcastStatusChange: PropTypes.func,
  handleViewersUpdate: PropTypes.func,
  syncEnabled: PropTypes.bool,
  listenerProfileInfo: PropTypes.object
}
