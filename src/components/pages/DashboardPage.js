import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { H1, H2, P } from '../styles/base'
import Navbar from '../Navbar'
import Button from '../design-system/Button'

import broadcastApi from '../../lib/broadcast'

/**
 *   /
 */
function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [broadcasts, setBroadcasts] = useState([])

  const getActiveBroadcasts = async () => {
    const retrievedBroadcasts = await broadcastApi.getActiveBroadcasts()
    console.log(retrievedBroadcasts)
    setBroadcasts(retrievedBroadcasts || [])
    setIsLoading(false)
  }

  useEffect(() => {
    getActiveBroadcasts()
  }, [])
  return (
    <>
      <Navbar loggedIn={true} />
      <H1>Dashboard</H1>
      <Link to='broadcaster'>
        <Button> Start A Broadcast </Button>
      </Link>
      <H1>Active Broadcasts</H1>
      {isLoading || !broadcasts || !broadcasts.length ? (
        <P>Loading Broadcasts...</P>
      ) : (
        <ul>
          {broadcasts.map((broadcast, index) => {
            return (
              <li>
                <Link to={`listener?broadcastId=${broadcast}`}>
                  {broadcast}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}

export default DashboardPage
