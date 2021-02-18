import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import propTypes from 'api/propTypes'
import ScrollProgress from '@oakwood/oui/ScrollProgress'
import { Section, Container, Typography, Box, Button } from 'components'
import RouterLink from 'containers/RouterLink'
import mathUtils from 'utils/math'
import { isEmpty } from 'lodash'
import { InView } from 'react-intersection-observer'
import routeMatch from 'utils/routeMatch'
import { useMediaQuery } from '@material-ui/core'
import ScrollDownButton from 'components/ScrollDownButton'
import PictureSources from 'components/PictureSources'
import ResponsiveVideo from 'components/ResponsiveVideo'
import { IMAGE_DIMENSIONS_FULL } from 'src/site.config'
import {
  createSanityImageSources,
  createSanityImageSrc,
  createSanityImageSrcSet,
  createSanityVideoBreakpoints,
} from 'utils/sanity'

export const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
    '&$animatedScroll': {
      height: '200vh',
    },
  },
  animatedScroll: {},
  content: {
    height: '100%',
    // padding: theme.spacing(10, 4),
    padding: `calc(var(--site-header-height) + ${theme.spacing(4)}px) ${theme.spacing(4, 4, 4)}`,
    '$animatedScroll &': {
      opacity: 0,
    },
    display: 'flex',
    transition: theme.transitions.create(['opacity'], { duration: 1000 }),
    '$layout-left &': {
      alignItems: 'center',
    },
    '$layout-right &': {
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    '$layout-top-right &': {
      justifyContent: 'flex-end',
    },
    '$layout-bottom-right &': {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    '$layout-bottom-left &': {
      alignItems: 'flex-end',
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(20, 10),
    },
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(20, 20),
    },
  },
  'layout-left': {},
  'layout-right': {},
  'layout-top-left': {},
  'layout-top-right': {},
  'layout-bottom-right': {},
  'layout-bottom-left': {},
  boundsArea: {
    ...theme.mixins.absoluteCover(),
    zIndex: -1,
  },
  viewportArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'sticky',
    top: 0,
    height: '100vh',
  },
  text: {
    marginTop: theme.spacing(1),
    textShadow: '0 0 30px rgba(0, 0, 0, 1)',
  },
  cta: {
    minWidth: 200,
  },
  background: {
    ...theme.mixins.absoluteCover(),
    zIndex: -1,
  },
  backgroundMedia: {
    ...theme.mixins.absoluteCover(),
    objectFit: 'cover',
    height: '100%',
    width: '100%',
  },
  mediaLoaderWrapper: {
    ...theme.mixins.absoluteCover(),
    zIndex: -1,
  },
  borders: {
    '--scale': 1,
    // Match `--size` to `Container` gutters.
    '--size': `${theme.spacing(2)}px`,
    [theme.breakpoints.up('sm')]: {
      '--size': `${theme.spacing(4)}px`,
    },
    [theme.breakpoints.up('md')]: {
      '--size': `${theme.spacing(6)}px`,
    },
  },
  border: {
    '$root:not($animatedScroll) &': {
      display: 'none',
    },
    ...theme.mixins.absoluteCover(),
    backgroundColor: 'var(--root-theme-background-color)',
    '&:nth-child(1)': {
      bottom: 'auto',
      height: 'var(--size)',
      transform: 'scaleY(var(--scale))',
      transformOrigin: 'top',
    },
    '&:nth-child(2)': {
      left: 'auto',
      width: 'var(--size)',
      transform: 'scaleX(var(--scale))',
      transformOrigin: 'right',
    },
    '&:nth-child(3)': {
      top: 'auto',
      height: 'var(--size)',
      transform: 'scaleY(var(--scale))',
      transformOrigin: 'bottom',
    },
    '&:nth-child(4)': {
      right: 'auto',
      width: 'var(--size)',
      transform: 'scaleX(var(--scale))',
      transformOrigin: 'left',
    },
  },
  scrollDownArrow: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: 'translateX(-50%)',
  },
}))

function clampMap(value, range1, range2, output1 = 0, output2 = 1) {
  return mathUtils.map(mathUtils.clamp(value, range1, range2), range1, range2, output1, output2)
}

const HeroBlock = props => {
  const {
    backgroundMedia,
    headline,
    text,
    layoutMobile = 'top-left',
    layoutDesktop = 'top-left',
    cta,
    disableAnimation,
    rootElement,
  } = props
  const classes = useStyles()
  const bordersRef = React.useRef(null)
  const contentRef = React.useRef(null)
  const mediaRef = React.useRef(null)
  const mdUp = useMediaQuery(theme => theme.breakpoints.up('md'))

  const handleScroll = ({ innerProgress }) => {
    const borderProgress = clampMap(innerProgress, 0, 0.3)
    bordersRef.current.style.setProperty('--scale', 1 - borderProgress)

    const contentProgress = clampMap(innerProgress, 0, 0.7)
    contentRef.current.style.transform = `translate3d(0, ${80 - 80 * contentProgress}px, 0)`
    if (innerProgress > 0) {
      contentRef.current.style.opacity = 1
    }
  }

  const handleIntersect = inView => {
    if (inView && mediaRef.current) {
      mediaRef.current.play()
    } else if (mediaRef.current) {
      mediaRef.current.currentTime = 0
      mediaRef.current.pause()
    }
  }

  let MediaLoaderWrapper = 'div'
  const mediaLoaderWrapperProps = {}
  if (backgroundMedia.component === 'video') {
    MediaLoaderWrapper = InView
    mediaLoaderWrapperProps.onChange = handleIntersect
  }

  return (
    <Section
      disablePadding
      disableSpacing
      className={classnames(
        classes.root,
        classes[`layout-${mdUp ? layoutDesktop : layoutMobile}`],
        !disableAnimation && classes.animatedScroll,
      )}
    >
      <ScrollProgress className={classes.boundsArea} onChange={!disableAnimation && handleScroll} />
      <div className={classes.viewportArea}>
        <MediaLoaderWrapper {...mediaLoaderWrapperProps} className={classes.mediaLoaderWrapper}>
          {backgroundMedia?.component === 'video' && (
            <ResponsiveVideo
              className={classes.backgroundMedia}
              breakpoints={createSanityVideoBreakpoints(backgroundMedia)}
              autoPlay
              muted
              playsInline
              {...backgroundMedia.properties}
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
              srcSet={createSanityImageSrcSet(backgroundMedia.src, IMAGE_DIMENSIONS_FULL.xs.srcSet)}
              sizes={IMAGE_DIMENSIONS_FULL.xs.sizes}
              alt={backgroundMedia.alt}
            />
          )}{' '}
        </MediaLoaderWrapper>
        <div className={classes.borders} ref={bordersRef}>
          <div className={classes.border} />
          <div className={classes.border} />
          <div className={classes.border} />
          <div className={classes.border} />
        </div>
        <Container className={classes.content} ref={contentRef} maxWidth="xl">
          <Box maxWidth={500}>
            {headline && <Typography variant="h4">{headline}</Typography>}
            {text && (
              <Typography variant="body1" className={classes.text}>
                {text}
              </Typography>
            )}
            {cta?.link?.href && (
              <Box mt={4}>
                <Button
                  component={RouterLink}
                  href={routeMatch(cta.link.href)}
                  as={cta.link.href}
                  variant="outlined"
                  color="inherit"
                  className={classes.cta}
                >
                  {cta.link.label}
                </Button>
              </Box>
            )}
          </Box>
        </Container>
        {rootElement && rootElement.nextSibling && (
          <ScrollDownButton scrollElement={rootElement} className={classes.scrollDownArrow} />
        )}
      </div>
    </Section>
  )
}

HeroBlock.propTypes = {
  backgroundMedia: propTypes.media.isRequired,
  headline: PropTypes.string,
  text: PropTypes.string,
  cta: propTypes.cta,
  layoutMobile: PropTypes.oneOf([
    'left',
    'top-left',
    'top-right',
    'right',
    'bottom-right',
    'bottom-left',
  ]),
  layoutDesktop: PropTypes.oneOf([
    'left',
    'top-left',
    'top-right',
    'right',
    'bottom-right',
    'bottom-left',
  ]),
  disableAnimation: PropTypes.bool,
  rootElement: PropTypes.object,
}

export default HeroBlock
