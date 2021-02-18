import React from 'react'
import HeaderBlock from './Header'

export default { title: 'Header block' }

export const Default = () => (
  <HeaderBlock
    headline="X Shore in Barcelona"
    subheadline="September 21"
    backgroundMedia={{
      breakpoints: {
        xs:
          'https://cdn.sanity.io/images/qih6a9z9/stage/b52c3b24466dd337c0071f66066660ef56d43860-6720x4480.png?w=800',
      },
    }}
  />
)
