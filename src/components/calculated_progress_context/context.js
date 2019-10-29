import React, { createContext } from 'react'

const CalculatedProgressContext = createContext({
  calculatedProgressMs: 0,
  setCalculatedProgressMs: () => {}
})

export default CalculatedProgressContext
