import React from 'react'
import LinkListBlock from './LinkList'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { darkTheme } from 'src/theme'

export default { title: 'LinkList block' }

export const Default = () => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <LinkListBlock
      headline="Further reading"
      links={Array.from({ length: 3 }, (_, i) => ({
        icon: 'Boat',
        description: 'We are taking on the challenge of re-inventing marine technology.',
        key: i,
        link: {
          label: 'Technology',
          href: '/technology',
        },
      }))}
    />
  </ThemeProvider>
)
