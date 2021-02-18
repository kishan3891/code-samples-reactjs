import React from 'react'
import propTypes from 'api/propTypes'
import {
  AppDrawerPrimaryItems,
  AppDrawerPrimaryItem,
  Typography,
  Box,
  Link,
  IconButton,
} from 'components'
import { makeStyles } from '@material-ui/core/styles'
import RouterLink from 'containers/RouterLink'
import routeMatch from 'utils/routeMatch'
import Hidden from '@material-ui/core/Hidden'
import * as icons from 'components/icons'

export const useStyles = makeStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    color: theme.palette.getContrastText(theme.palette.background.default),
  },
  flexContainer: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'row-reverse',
    },
  },
  primaryItems: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('md')]: {
      width: 366,
      borderLeft: `1px solid ${theme.palette.divider}`,
      borderBottom: 'none',
    },
  },
  primaryItemImage: {
    width: 'auto',
    objectFit: 'none',
    padding: theme.spacing(1),
  },
  inner: {
    padding: theme.spacing(4, 0),
    ...theme.mixins.gutters(),
    [theme.breakpoints.up('md')]: {
      flexGrow: 1,
      display: 'flex',
      textAlign: 'center',
      alignItems: 'center',
    },
  },
  secondaryLinks: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      '& > *': {
        marginRight: theme.spacing(3),
      },
    },
  },
  socialIcons: {
    borderTop: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'center',
  },
  tertiaryLink: {
    display: 'block',
    lineHeight: 1.6,
  },
  label: {
    marginTop: theme.spacing(1),
  },
  icon: {
    height: 35,
  },
}))

const AppFooterMenu = props => {
  const { navigation, footer } = props
  const classes = useStyles()

  return (
    <nav className={classes.root}>
      <Hidden mdUp implementation="css">
        <div className={classes.flexContainer}>
          <AppDrawerPrimaryItems className={classes.primaryItems}>
            {navigation.mobile?.primaryItems.map(primaryItem => {
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
          <div className={classes.inner}>
            <div className={classes.secondaryLinks}>
              {navigation.mobile?.secondaryLinks.map(secondaryLink => (
                <Link
                  component={RouterLink}
                  variant="subtitle1"
                  color="textSecondary"
                  href={routeMatch(secondaryLink.href)}
                  as={secondaryLink.href}
                  className={classes.tertiaryLink}
                  key={secondaryLink.label}
                >
                  {secondaryLink.label}
                </Link>
              ))}
              {navigation.mobile?.tertiaryLinks.map(tertiaryLink => (
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
      </Hidden>

      <Hidden smDown implementation="css">
        <div className={classes.flexContainer}>
          <AppDrawerPrimaryItems className={classes.primaryItems}>
            {navigation.desktop?.primaryItems.map(primaryItem => {
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
          <div className={classes.inner}>
            <div className={classes.secondaryLinks}>
              {footer.footerLinks?.map(footerLink => (
                <Link
                  component={RouterLink}
                  variant="subtitle1"
                  color="textSecondary"
                  href={routeMatch(footerLink.href)}
                  as={footerLink.href}
                  className={classes.tertiaryLink}
                  key={footerLink.label}
                >
                  {footerLink.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Hidden>
      <div className={classes.socialIcons}>
        {footer.socialLinks?.map(socialLink => {
          const Icon = icons[socialLink.icon]
          return (
            <IconButton key={socialLink._key} component={RouterLink} href={socialLink.link?.href}>
              <Icon />
            </IconButton>
          )
        })}
      </div>
    </nav>
  )
}

AppFooterMenu.propTypes = {
  navigation: propTypes.navigation,
  footer: propTypes.footer,
}

export default AppFooterMenu
