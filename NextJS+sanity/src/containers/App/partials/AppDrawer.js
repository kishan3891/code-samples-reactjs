import React from 'react'
import PropTypes from 'prop-types'
import { AppDrawer } from 'components'
import AppNavMenu from './AppNavMenu'
import AppNavMenuPrimary from './AppNavMenuPrimary'
import AppNavFooter from './AppNavFooter'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
  },
  footer: {},
  nav: {
    height: 'calc(100vh - (var(--site-header-height)))',
    display: 'grid',
    gridTemplateRows: 'auto 1fr 68px',
  },
  primary: {
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}))

const AppAppDrawer = props => {
  const { isNavMenuOpen, onNavMenuClose } = props
  const classes = useStyles()

  return (
    <AppDrawer open={isNavMenuOpen} onClose={onNavMenuClose} className={classes.root}>
      <nav className={classes.nav}>
        <AppNavMenuPrimary {...props} className={classes.primary} />
        <AppNavMenu {...props} />
        <AppNavFooter {...props} className={classes.footer} />
      </nav>
    </AppDrawer>
  )
}

AppAppDrawer.propTypes = {
  className: PropTypes.string,
  isNavMenuOpen: PropTypes.bool,
  onNavMenuClose: PropTypes.func.isRequired,
}

export default AppAppDrawer
