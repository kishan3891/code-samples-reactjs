import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import propTypes from 'api/propTypes'
import {
  Container,
  Section,
  Typography,
  Slideshow,
  SlideshowPagination,
  SlideshowNavigation,
  SlideshowSlides,
  SlideshowSlide,
  MediaLoader,
  Media,
  Box,
} from 'components'
import * as icons from 'components/icons'

export const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    color: theme.palette.getContrastText(theme.palette.background.default),
  },
  headline: {
    textAlign: 'center',
    padding: theme.spacing(4, 0),
    ...theme.typography.special,
    [theme.breakpoints.up('md')]: {
      ...theme.typography.specialBig,
    },
  },
  slideshow: {
    padding: theme.spacing(2, 0),
  },
  slideInner: {
    padding: theme.spacing(0, 5),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 10),
    },
  },
  features: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: 600,
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 800,
    },
    margin: 'auto',
  },
  feature: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      width: 300,
    },
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
  featureIcon: {
    width: 50,
    height: 50,
    objectFit: 'none',
    flexShrink: 0,
  },
  featureTextIcon: {
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: 50,
    border: `1px solid ${theme.palette.divider}`,
  },
}))

const SlideshowBlock = props => {
  const { headline, images, keyFeatures } = props
  const classes = useStyles()

  return (
    <Section className={classes.root}>
      <Container maxWidth="lg" className={classes.content}>
        <Typography className={classes.headline}>{headline}</Typography>
        <Slideshow className={classes.slideshow}>
          <SlideshowSlides>
            {images.map(({ key, ...media }) => (
              <SlideshowSlide key={key}>
                <Box className={classes.slideInner}>
                  <MediaLoader className={classes.mediaLoader}>
                    <Media component="picture" {...media} />
                  </MediaLoader>
                </Box>
              </SlideshowSlide>
            ))}
          </SlideshowSlides>
          {images.length > 1 && (
            <>
              <SlideshowNavigation
                IconProps={{ fontSize: 'small' }}
                size="small"
                variant="previous"
              />
              <SlideshowNavigation IconProps={{ fontSize: 'small' }} size="small" variant="next" />
              <SlideshowPagination />
            </>
          )}
        </Slideshow>
        <Box display="flex" flexWrap="wrap" className={classes.features}>
          {keyFeatures.map(feature => {
            const Icon = icons[feature.icon]
            return (
              <Box display="flex" alignItems="center" className={classes.feature} key={feature.key}>
                {feature.iconText ? (
                  <Box mr={2} className={classes.featureTextIcon}>
                    <Typography variant="h5">{feature.iconText}</Typography>
                  </Box>
                ) : (
                  feature.icon && (
                    <Box mr={2}>
                      <Icon fontSize="large" className={classes.featureIcon} />
                    </Box>
                  )
                )}
                <Typography>{feature.text}</Typography>
              </Box>
            )
          })}
        </Box>
      </Container>
    </Section>
  )
}

SlideshowBlock.propTypes = {
  className: PropTypes.string,
  headline: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(propTypes.media).isRequired,
  keyFeatures: PropTypes.array,
}

export default SlideshowBlock
