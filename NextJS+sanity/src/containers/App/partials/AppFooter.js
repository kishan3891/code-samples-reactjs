import React from 'react'
import PropTypes from 'prop-types'
import AppFooterMenu from './AppFooterMenu'
import AppNavFooter from './AppNavFooter'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    width: 'calc(100% - var(--product-drawer-width))',
  },
}))

const AppFooter = props => {
  const classes = useStyles()

  return (
    <footer className={classes.root}>
      <AppFooterMenu {...props} />
      <AppNavFooter {...props} />
    </footer>
  )
}

AppFooter.propTypes = {
  legal: PropTypes.string,
}

export default AppFooter
