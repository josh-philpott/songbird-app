import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { P } from '../../styles/base'

const CopyLinkButtonBase = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 110px;
  color: #91cce5;
  background-color: unset;
  border: unset;
  :focus {
    outline: none !important;
    font-weight: 500;
  }
`

function CopyLinkButton(props) {
  console.log('shareLink:', props)
  return (
    <CopyLinkButtonBase
      onClick={() => {
        alert(props.shareLink)
      }}>
      <img src={process.env.PUBLIC_URL + '/img/link-icon.svg'} />
      <P style={{ color: '#91CCE5' }}>Share Link</P>
    </CopyLinkButtonBase>
  )
}

CopyLinkButton.propTypes = {
  shareLink: PropTypes.string
}

export default CopyLinkButton
