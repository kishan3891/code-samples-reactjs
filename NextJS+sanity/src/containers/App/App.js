import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { Toolbar, IconButton, Box, Link, Chip, DialogContent, Typography } from 'components'
import RouterLink from 'containers/RouterLink'
import { DialogWithCloseButton } from 'components/Dialog'
import AppBar from './partials/AppAppBar'
import AppDrawer from './partials/AppDrawer'
import AppFooter from './partials/AppFooter'
import ContactForm from 'containers/ContactForm'
import NewsletterForm from 'containers/NewsletterForm'
import { SITE_HEADER_ID } from 'src/site.config'
import { ThemeProvider } from '@material-ui/core'
import { darkTheme } from 'src/theme'
import { MenuIcon, LogoFullIcon, LogoIcon, CloseIcon } from 'components/icons'
import useTranslations from 'src/i18n'
import { useRouter } from 'next/router'
import useBodyClass from './useBodyClass'

export const useStyles = makeStyles(theme => ({
  root: {},
  headerHidden: {},
  appBar: {
    transition: theme.transitions.create(['background-color', 'color', 'backdrop-filter']),
    '$headerHidden &': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      backdropFilter: 'blur(0px)',
    },
    color: theme.palette.common.fallbackHeaderColor || 'var(--block-shade)',
  },
  toolbar: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
  },
  logo: {
    width: 41,
    height: 51,
    transition: theme.transitions.create(['opacity']),
    '$headerHidden &': {
      opacity: 1,
    },
  },
  logoLink: {
    display: 'flex',
  },
  appDrawerCloseButton: {
    position: 'fixed',
    top: theme.spacing(1),
    left: theme.spacing(2),
    zIndex: 2000,
  },
  contactLogo: {},
  contactChip: {
    color: 'inherit',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      right: theme.spacing(4),
    },
    '& $contactLogo': {
      color: 'inherit',
    },
  },
}))

const App = props => {
  const classes = useStyles()
  const translations = useTranslations()
  const {
    children,
    onAppBarBurgerClick,
    onNavMenuClose,
    isNavMenuOpen,
    isNewsletterOpen,
    isContactDialogOpen,
    onContactDialogOpen,
    onContactDialogClose,
    onNewsletterClose,
    isHeaderHidden,
  } = props

  const router = useRouter()
  if (router.query?.slug === 'boat-configurator' || router.query?.slug === 'boat-configurator-summary') {
    useBodyClass(`boat-configurator`);
  }

  return (
    <div className={classnames(classes.root, isHeaderHidden && classes.headerHidden)}>
      {/* AppBar and AppDrawer should always use dark theme */}
      {router.query?.slug !== 'boat-configurator' && router.query?.slug !== 'boat-configurator-summary' ?
        <ThemeProvider theme={darkTheme}>
          <AppBar className={classes.appBar} id={SITE_HEADER_ID}>
            <Toolbar className={classes.toolbar}>
              <Box>
                {isNavMenuOpen ? (
                  <IconButton onClick={onNavMenuClose} color="inherit">
                    <CloseIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={onAppBarBurgerClick} color="inherit">
                    <MenuIcon />
                  </IconButton>
                )}
              </Box>
              <Box display="flex" justifyContent="center">
                <Link component={RouterLink} className={classes.logoLink} href="/" as="/">
                  <LogoFullIcon className={classes.logo} />
                </Link>
              </Box>
              <Chip
                avatar={<LogoIcon className={classes.contactLogo} />}
                label={translations`navigation.contact`}
                onClick={onContactDialogOpen}
                className={classes.contactChip}
              />
            </Toolbar>
          </AppBar>
          <AppDrawer {...props} />
        </ThemeProvider>
      : ''
      }
      {children}
      {router.query?.slug !== 'boat-configurator' && router.query?.slug !== 'boat-configurator-summary' ?
        <AppFooter {...props} />
      :''
      }
      {/* contact form dialog */}
      <DialogWithCloseButton open={isContactDialogOpen} onClose={onContactDialogClose}>
        <DialogContent>
          <Box textAlign="center">
            <Typography>{translations`contactForm.title`}</Typography>
          </Box>
          <Box mt={2}>
            <ContactForm />
          </Box>
        </DialogContent>
      </DialogWithCloseButton>
      {/* newsletter form dialog */}
      <DialogWithCloseButton open={isNewsletterOpen} onClose={onNewsletterClose}>
        <DialogContent>
          <Box textAlign="center">
            <Typography>{translations`newsletterForm.title`}</Typography>
          </Box>
          <Box mt={2}>
            <NewsletterForm mailchimpUrl="https://xshore.us17.list-manage.com/subscribe/post?u=dd0717a7364c19e3effea7b2e&amp;id=6a508c28a0" />
          </Box>
        </DialogContent>
      </DialogWithCloseButton>
    </div>
  )
}

App.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  twitterAccount: PropTypes.string,
  featuredImage: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onAppBarBurgerClick: PropTypes.func.isRequired,
  onNavMenuClose: PropTypes.func.isRequired,
  isNavMenuOpen: PropTypes.bool,
  isHeaderHidden: PropTypes.bool,
  isNewsletterOpen: PropTypes.bool,
  onNewsletterOpen: PropTypes.func.isRequired,
  onNewsletterClose: PropTypes.func.isRequired,
  isContactDialogOpen: PropTypes.bool,
  onContactDialogClose: PropTypes.func.isRequired,
  onContactDialogOpen: PropTypes.func.isRequired,
}

export default App
