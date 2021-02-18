import React from 'react'
import propTypes from 'api/propTypes'
import PropTypes from 'prop-types'
import { Typography, Link } from 'components'
import RouterLink from 'containers/RouterLink'
import routeMatch from 'utils/routeMatch'
import { makeStyles, useMediaQuery } from '@material-ui/core'
import useTranslations from 'src/i18n'

export const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(theme.palette.background.default),
    overflow: 'scroll',
    [theme.breakpoints.up('md')]: {
      overflow: 'auto',
    },
  },
  primaryItems: {
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  primaryItemImage: {
    width: 'auto',
    objectFit: 'none',
    padding: theme.spacing(1),
  },
  inner: {
    padding: theme.spacing(4, 0),
    ...theme.mixins.gutters(),
  },
  secondaryLink: {
    display: 'block',
  },
  tertiaryLinks: {
    marginTop: theme.spacing(2),
  },
  tertiaryLink: {
    lineHeight: 1.6,
  },
}))

const AppNavMenu = props => {
  const { navigation } = props
  const classes = useStyles()
  const translations = useTranslations()
  const isMdUp = useMediaQuery(theme => theme.breakpoints.up('md'))

  const secondaryLinks = isMdUp
    ? navigation.desktop?.secondaryLinks
    : navigation.mobile?.secondaryLinks
  const tertiaryLinks = isMdUp
    ? navigation.desktop?.tertiaryLinks
    : navigation.mobile?.tertiaryLinks

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.secondaryLinks}>
          {secondaryLinks?.map(secondaryLink => (
            <Link
              component={RouterLink}
              variant="h5"
              href={routeMatch(secondaryLink.href)}
              as={secondaryLink.href}
              className={classes.secondaryLink}
              key={secondaryLink.label}
            >
              {secondaryLink.label}
            </Link>
          ))}
        </div>
        <div className={classes.tertiaryLinks}>
          {tertiaryLinks.map(tertiaryLink => (
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.tertiaryLink}
              key={tertiaryLink.label}
            >
              <Link
                component={RouterLink}
                href={routeMatch(tertiaryLink.href)}
                as={tertiaryLink.href}
              >
                {tertiaryLink.label}
              </Link>
            </Typography>
          ))}
        </div>
      </div>
    </div>
  )
}

AppNavMenu.propTypes = {
  navigation: propTypes.navigation,
  onNewsletterOpen: PropTypes.func.isRequired,
}

export default AppNavMenu
