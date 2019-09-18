import React from 'react'
import styled from 'styled-components'

//Need to fix the margin to use it other places
const Spinner = styled.div`
  margin: 45vh auto;
  width: 50px;
  height: 60px;
  text-align: center;
  font-size: 10px;

  > div {
    background-color: #fff;
    height: 100%;
    width: 6px;
    display: inline-block;
    margin: 0px 2px;

    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }
  > .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  > .rect3 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  > .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  > .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  @-webkit-keyframes sk-stretchdelay {
    0%,
    40%,
    100% {
      -webkit-transform: scaleY(0.4);
    }
    20% {
      -webkit-transform: scaleY(1);
    }
  }

  @keyframes sk-stretchdelay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
      -webkit-transform: scaleY(1);
    }
  }
`

function LoadingSpinner() {
  return (
    <Spinner>
      <div class='rect1'></div>
      <div class='rect2'></div>
      <div class='rect3'></div>
      <div class='rect4'></div>
      <div class='rect5'></div>
    </Spinner>
  )
}

export default LoadingSpinner
