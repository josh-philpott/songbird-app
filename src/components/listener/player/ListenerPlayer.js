import React from 'react'

import styled from 'styled-components'
import { white, H2, primaryFont } from '../../styles/base'
import ViewCounter from './ViewCounter'

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
      isLoading: true
    }
  }

  async componentDidMount() {}

  render() {
    console.log(this.props.currentSongInfo)
    return (
      <Player>
        <TopRow>
          <Header>Currently Playing</Header>
          <ViewCounter />
        </TopRow>
        <SecondRow>
          <AlbumArt src={this.props.currentSongInfo.albumArtUrl} />
          <BottomRightContainer>
            <SongTitle>{this.props.currentSongInfo.name}</SongTitle>
            <ArtistName>{this.props.currentSongInfo.artist}</ArtistName>
          </BottomRightContainer>
        </SecondRow>
      </Player>
    )
  }
}

export default ListenerPlayer
