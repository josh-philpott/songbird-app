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
  margin: 0px auto;
  padding: 0px 20px;
`

const SongTitle = styled.h3`
  ${primaryFont}
  font-weight:500;
  font-size: 24px;
  line-height: 2;
  color: ${white};
  margin: 0px;
`

const ArtistName = styled.p`
  ${primaryFont}
  color: ${white};
  margin: 0px;
`

class ListenerPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      currentSongInfo: {}
    }
  }

  async componentDidMount() {}

  setCurrentSongInfo(currentlyPlaying) {
    let currentSongInfo = {}
    if (currentlyPlaying && currentlyPlaying.item) {
      currentSongInfo.name = currentlyPlaying.item.name
      currentSongInfo.artist = currentlyPlaying.item.artists[0].name
      currentSongInfo.albumArtUrl = currentlyPlaying.item.album.images[0].url
    }

    this.setState({
      isLoading: false,
      currentSongInfo
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
              <SongTitle>{this.state.currentSongInfo.name}</SongTitle>
              <ArtistName>{this.state.currentSongInfo.artist}</ArtistName>
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
