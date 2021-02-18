import { compose } from 'recompose'
import { withAppContext, withAppProvider } from './AppContext'
import App from './App'

export default compose(
  withAppProvider(),
  withAppContext(),
)(App)
