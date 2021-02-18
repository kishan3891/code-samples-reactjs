import React from 'react'
import ListBlock from './List'

export default { title: 'Booking block' }

export const Default = () => (
  <ListBlock
    items={[
      { title: '1 day', description: 'Lorem ipsum included*', value: '€300', key: 'a' },
      { title: '2 day', description: 'Lorem ipsum not included*', value: '€400', key: 'b' },
    ]}
  />
)
