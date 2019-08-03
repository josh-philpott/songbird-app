import React from 'react'

import styled from 'styled-components'
import { white, H2, primaryFont } from '../../styles/base'
import ViewCounter from './ViewCounter'

import ListenerStreamController from '../ListenerStreamController'

const Player = styled.section`
  width: 480px;
  height: 220px;
  background-color: #2a2a2a;
  border: 1px solid #000000;
  border-radius: 6px;
  margin: 50px auto;
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
  justify-content: space-between
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

const ProgressContainer = styled.section`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: ${white};
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ProgressBar = styled.progress`
  flex-grow: 1;
  margin: 0px 10px;
`

class ListenerPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      currentSongInfo: {},
      currentlyPlaying: {},
      progressString: '',
      durationString: ''
    }
  }

  async componentDidMount() {}

  calculateProgressString(ms) {
    const totalSeconds = Math.floor(ms / 1000)
    const seconds = totalSeconds % 60
    const minutes = Math.floor(totalSeconds / 60)

    let secondsString = seconds < 10 ? `0${seconds}` : seconds.toString()
    return `${minutes}:${secondsString}`
  }

  setProgressStrings(currentlyPlaying) {
    const progressString = this.calculateProgressString(
      currentlyPlaying.progress_ms || 0
    )
    const durationString = this.calculateProgressString(
      currentlyPlaying.item.duration_ms || 0
    )

    this.setState({
      progressString,
      durationString
    })
  }

  setCurrentSongInfo(currentlyPlaying) {
    let currentSongInfo = {}
    if (currentlyPlaying && currentlyPlaying.item) {
      currentSongInfo.name = currentlyPlaying.item.name
      currentSongInfo.artist = currentlyPlaying.item.artists[0].name
      currentSongInfo.albumArtUrl = currentlyPlaying.item.album.images[0].url
      currentSongInfo.progress_ms = currentlyPlaying.progress_ms
      currentSongInfo.duration_ms = currentlyPlaying.item.duration_ms
      this.setProgressStrings(currentlyPlaying)
    }

    this.setState({
      isLoading: false,
      currentSongInfo,
      currentlyPlaying
    })
  }

  render() {
    return (
      <Player>
        <TopRow>
          <Header>Currently Playing</Header>
          <ViewCounter />
        </TopRow>
        {this.state.isLoading ? null : (
          <SecondRow>
            <AlbumArt src={this.state.currentSongInfo.albumArtUrl} />
            <BottomRightContainer>
              <TopContainer>
                <SongTitle>{this.state.currentSongInfo.name}</SongTitle>
                <ArtistName>{this.state.currentSongInfo.artist}</ArtistName>
              </TopContainer>
              <ProgressContainer>
                <p>{this.state.progressString}</p>
                <ProgressBar
                  value={this.state.currentSongInfo.progress_ms || 0}
                  max={this.state.currentSongInfo.duration_ms || 0}
                />
                <p>{this.state.durationString}</p>
              </ProgressContainer>
            </BottomRightContainer>
          </SecondRow>
        )}
        <ListenerStreamController
          streamUpdateHandler={this.setCurrentSongInfo.bind(this)}
          broadcastId={this.props.broadcastId}
        />
      </Player>
    )
  }
}

export default ListenerPlayer
