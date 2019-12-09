import React from 'react'
import { action } from '@storybook/addon-actions'

import Button from '../src/components/design-system/Button'
import { H1, H2, H3, H4, P, sizings } from '../src/components/globals'

export default {
  title: 'Typography'
}

export const Headings = () => (
  <>
    <H1>This is an H1</H1>
    <H2>This is an H2</H2>
    <H3>This is an H3</H3>
    <H4>This is an H4</H4>
  </>
)

export const Paragraphs = () => (
  <>
    <P size={sizings.xxl}>This is a XXL paragraph tag.</P>
    <P size={sizings.xl}>This is a XL paragraph tag.</P>
    <P size={sizings.lg}>This is a LG paragraph tag.</P>
    <P size={sizings.md}>This is a MD paragraph tag.</P>
    <P size={sizings.s}>This is a S paragraph tag.</P>
    <P size={sizings.xs}>This is a XS paragraph tag.</P>
  </>
)
