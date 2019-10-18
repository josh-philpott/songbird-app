import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard'

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

  :hover {
    font-weight: 800;
  }
`

function CopyLinkButton(props) {
  return (
    <CopyToClipboard text={props.shareLink}>
      <CopyLinkButtonBase
        onClick={() => {
          alert(props.shareLink)
        }}>
        <img src={process.env.PUBLIC_URL + '/img/link-icon.svg'} />
        <P style={{ color: '#91CCE5' }}>Share Link</P>
      </CopyLinkButtonBase>
    </CopyToClipboard>
  )
}

CopyLinkButton.propTypes = {
  shareLink: PropTypes.string
}

export default CopyLinkButton
