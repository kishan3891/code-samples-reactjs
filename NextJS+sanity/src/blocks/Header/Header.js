import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { Section, Container, Typography, Box, Button } from 'components'
import RouterLink from 'containers/RouterLink'
import { LogoFullIcon } from 'components/icons'
import propTypes from 'api/propTypes'
import { isEmpty } from 'lodash'
import routeMatch from 'utils/routeMatch'
import * as icons from 'components/icons'
import ResponsiveVideo from 'components/ResponsiveVideo'
import ScrollDownButton from 'components/ScrollDownButton'
import { IMAGE_DIMENSIONS_FULL } from 'src/site.config'
import PictureSources from 'components/PictureSources'
import {
  createSanityImageSources,
  createSanityImageSrc,
  createSanityImageSrcSet,
  createSanityVideoBreakpoints,
} from 'utils/sanity'

export const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    display: 'flex',
    alignItems: 'center',
    minHeight: 368,
    [theme.breakpoints.up('md')]: {
      minHeight: 460,
    },
  },
  showLogo: {},
  headline: {
    ...theme.typography.h3,
    [theme.breakpoints.up('md')]: {
      ...theme.typography.h2,
    },
    '$showLogo &': {
      ...theme.typography.h6,
    },
  },
  background: {
    ...theme.mixins.absoluteCover(),
  },
  backgroundMedia: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  logo: {
    width: 96,
    height: 87,
    objectFit: 'none',
  },
  content: {
    zIndex: 10,
    textAlign: 'center',
  },
  scrollDownArrow: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: 'translateX(-50%)',
  },
}))

const HeaderBlock = props => {
  const {
    headline,
    subheadline,
    backgroundMedia,
    cta = {},
    secondaryCta = {},
    showLogo,
    rootElement,
  } = props
  const classes = useStyles()

  const CtaIcon = icons[cta.icon]
  const SecondaryCtaIcon = icons[secondaryCta.icon]

  return (
    <Section disableSpacing className={classnames(classes.root, showLogo && classes.showLogo)}>
      {backgroundMedia?.component === 'video' && (
        <ResponsiveVideo
          className={classes.backgroundMedia}
          breakpoints={createSanityVideoBreakpoints(backgroundMedia)}
          autoPlay
          loop
          muted
          playsInline
        />
      )}
      {backgroundMedia?.breakpoints && backgroundMedia.component !== 'video' && (
        <picture>
          <PictureSources
            sources={createSanityImageSources(backgroundMedia, IMAGE_DIMENSIONS_FULL)}
          />
          <img
            className={classes.backgroundMedia}
            src={createSanityImageSrc(
              backgroundMedia.breakpoints.md || backgroundMedia.breakpoints.xs,
              1280,
            )}
            alt={backgroundMedia.alt}
          />
        </picture>
      )}
      {backgroundMedia && !backgroundMedia.breakpoints && (
        <img
          className={classes.backgroundMedia}
          srcSet={
            !backgroundMedia.disableSrcSet
              ? createSanityImageSrcSet(backgroundMedia.src, IMAGE_DIMENSIONS_FULL.xs.srcSet)
              : null
          }
          src={backgroundMedia.src}
          sizes={IMAGE_DIMENSIONS_FULL.xs.sizes}
          alt={backgroundMedia.alt}
        />
      )}
      <Container maxWidth="sm" className={classnames(classes.content)}>
        {showLogo && (
          <Box mb={4}>
            <LogoFullIcon className={classes.logo} />
          </Box>
        )}
        {headline && (
          <Typography component="h1" className={classes.headline}>
            {headline}
          </Typography>
        )}
        {subheadline && (
          <Box mt={4}>
            <Typography component="h2" variant="caption">
              {subheadline}
            </Typography>
          </Box>
        )}
        {!isEmpty(cta.link) && (
          <Box mt={4}>
            <Button
              endIcon={CtaIcon && <CtaIcon />}
              component={RouterLink}
              href={routeMatch(cta.link.href)}
              as={cta.link.href}
              variant="outlined"
              color="primary"
              fullWidth
            >
              {cta.link.label}
            </Button>
          </Box>
        )}
        {!isEmpty(secondaryCta.link) && (
          <Box mt={2}>
            <Button
              endIcon={SecondaryCtaIcon && <SecondaryCtaIcon />}
              component={RouterLink}
              href={routeMatch(secondaryCta.link.href)}
              as={secondaryCta.link.href}
              variant="contained"
              color="primary"
              fullWidth
            >
              {secondaryCta.link.label}
            </Button>
          </Box>
        )}
      </Container>
      {rootElement && rootElement.nextSibling && (
        <ScrollDownButton scrollElement={rootElement} className={classes.scrollDownArrow} />
      )}
    </Section>
  )
}

HeaderBlock.propTypes = {
  headline: PropTypes.string,
  subheadline: PropTypes.string,
  backgroundMedia: propTypes.media,
  cta: propTypes.cta,
  secondaryCta: propTypes.cta,
  showLogo: PropTypes.bool,
  rootElement: PropTypes.object,
}

export default HeaderBlock
