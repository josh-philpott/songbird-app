import React from 'react'
import ReactDOM from 'react-dom'
import Player from './Player'
import renderer from 'react-test-renderer'

it('renders correctly when nothing is playing', () => {
  const tree = renderer.create(<Player broadcastMeta={{
    broadcastId: 'test',
    profileImageUrl: '',
    displayName: 'Josh Philpott'
  }} />).toJSON()
  expect(tree).toMatchSnapshot()
})
