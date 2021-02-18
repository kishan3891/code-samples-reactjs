import React from 'react'
import propTypes from 'api/propTypes'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { AppDrawerPrimaryItems, AppDrawerPrimaryItem, Typography, Box } from 'components'
import RouterLink from 'containers/RouterLink'
import routeMatch from 'utils/routeMatch'
import { makeStyles, useMediaQuery } from '@material-ui/core'
import * as icons from 'components/icons'

export const useStyles = makeStyles(theme => ({
  root: {},
  label: {
    marginTop: theme.spacing(1),
  },
  icon: {
    height: 35,
  },
}))

const AppNavMenuPrimary = props => {
  const { navigation, className } = props
  const classes = useStyles()

  const isMdUp = useMediaQuery(theme => theme.breakpoints.up('md'))
  const primaryItems = isMdUp ? navigation.desktop?.primaryItems : navigation.mobile?.primaryItems

  return (
    <div className={classnames(classes.root, className)}>
      <AppDrawerPrimaryItems className={classes.primaryItems}>
        {primaryItems?.map(primaryItem => {
          const Icon = icons[primaryItem.icon]
          return (
            <AppDrawerPrimaryItem
              component={RouterLink}
              href={routeMatch(primaryItem.link.href)}
              as={primaryItem.link.href}
              key={primaryItem.link.label}
            >
              <Box display="flex" alignItems="center" flexDirection="column">
                <Icon fontSize="large" className={classes.icon} />
                <Typography variant="overline" className={classes.label}>
                  {primaryItem.link.label}
                </Typography>
              </Box>
            </AppDrawerPrimaryItem>
          )
        })}
      </AppDrawerPrimaryItems>
    </div>
  )
}

AppNavMenuPrimary.propTypes = {
  className: PropTypes.string,
  navigation: propTypes.navigation,
}

export default AppNavMenuPrimary
