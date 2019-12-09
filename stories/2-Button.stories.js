import React from 'react'
import { action } from '@storybook/addon-actions'

import Button from '../src/components/design-system/Button'

export default {
  title: 'Button'
}

export const Buttons = () => (
  <Button onClick={action('clicked')}>Hello Button</Button>
)
