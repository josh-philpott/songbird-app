import React, { useState, useEffect } from 'react'
import CalculatedProgressContext from './context'

const CalculatedProgressProvider = props => {
  const [value, setValue] = useState({
    calculatedProgressMs: 0,
    setCalculatedProgressMs: () => {}
  })

  const setCalculatedProgressMs = calculatedProgressMs => {
    setValue(state => ({
      ...state,
      calculatedProgressMs
    }))
  }

  useEffect(() => {
    setValue(state => ({ ...state, setCalculatedProgressMs }))
  }, [])

  return (
    <CalculatedProgressContext.Provider value={value}>
      {props.children}
    </CalculatedProgressContext.Provider>
  )
}

export default CalculatedProgressProvider
