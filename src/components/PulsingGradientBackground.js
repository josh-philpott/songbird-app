import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const BackgroundContainer = styled.div`
  position: fixed;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  padding: 0px;
  margin: 0px;
  top: 0;
  left: 0%;
`

function PulsingGradientBackground() {
  const [backgroundStyle, setBackgroundStyle] = useState({})

  const colors = new Array(
    [62, 35, 255],
    [60, 255, 60],
    [255, 35, 98],
    [45, 175, 230],
    [255, 0, 255],
    [255, 128, 0]
  )

  let step = 0
  let direction = 'up'
  //color table indices for:
  // current color left
  // next color left
  // current color right
  // next color right
  const colorIndices = [0, 1, 2, 3]

  //transition speed
  let gradientSpeed = 0.0005

  function updateGradient() {
    console.log('updating gradient')
    var currentColorLeft = colors[colorIndices[0]]
    var nextColorLeft = colors[colorIndices[1]]
    var currentColorRight = colors[colorIndices[2]]
    var c1_1 = colors[colorIndices[3]]

    var istep = 1 - step
    var r1 = Math.round(istep * currentColorLeft[0] + step * nextColorLeft[0])
    var g1 = Math.round(istep * currentColorLeft[1] + step * nextColorLeft[1])
    var b1 = Math.round(istep * currentColorLeft[2] + step * nextColorLeft[2])
    var color1 = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')'

    var r2 = Math.round(istep * currentColorRight[0] + step * c1_1[0])
    var g2 = Math.round(istep * currentColorRight[1] + step * c1_1[1])
    var b2 = Math.round(istep * currentColorRight[2] + step * c1_1[2])
    var color2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')'

    console.log(color1)
    console.log(color2)

    const background = {
      background:
        '-webkit-gradient(linear, left top, right bottom, from(' +
        color1 +
        '), to(' +
        color2 +
        '))'
      /* background:
        '-moz-linear-gradient(left, ' + color1 + ' 0%, ' + color2 + ' 100%)'*/
      //TODO: Figure out how to set multiple background css tags
    }

    setBackgroundStyle(background)

    if (direction === 'up') step += gradientSpeed
    else step -= gradientSpeed

    /*if (step >= 1) {
      step %= 1
      colorIndices[0] = colorIndices[1]
      colorIndices[2] = colorIndices[3]

      //pick two new target color indices
      //do not pick the same as the current one
      colorIndices[1] =
        (colorIndices[1] +
          Math.floor(1 + Math.random() * (colors.length - 1))) %
        colors.length
      colorIndices[3] =
        (colorIndices[3] +
          Math.floor(1 + Math.random() * (colors.length - 1))) %
        colors.length
    }*/
    if (step > 0.25) {
      direction = 'down'
    } else if (step <= 0) {
      direction = 'up'
      step = 0
    }

    console.log(backgroundStyle)
  }

  useEffect(() => {
    setInterval(updateGradient, 10)
  }, [])

  /*useEffect(() => {
    setInterval(setBackgroundBlue, 10)
  }, [])
*/
  return <BackgroundContainer style={backgroundStyle} />
}

export default PulsingGradientBackground
