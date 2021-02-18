import React from 'react'
import { compose, defaultProps, withProps, nest } from 'recompose'
import { navigation, legal } from 'api/mock'
import { withAppContext, withAppProvider } from './AppContext'
import { ThemeProvider } from '@material-ui/core'
import { lightTheme } from 'src/theme'
import App from './App'

const withApiContext = () => {
  return withProps({
    navigation,
    legal,
  })
}

const AppWithMockData = compose(
  withApiContext(),
  defaultProps({
    children: <div>[this.props.children]</div>,
  }),
  withAppProvider(),
  withAppContext(),
)(App)

export const AppStory = compose(withProps({ theme: lightTheme }))(
  nest(ThemeProvider, AppWithMockData),
)

export default { title: 'App' }
