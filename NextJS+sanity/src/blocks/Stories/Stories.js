import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import {
  Section,
  Container,
  Box,
  Media,
  MediaLoader,
  Typography,
  Slideshow,
  SlideshowSlides,
  SlideshowSlide,
  SectionHeadline,
  Link,
} from 'components'
import routeMatch from 'utils/routeMatch'
import RouterLink from 'containers/RouterLink'

export const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    color: theme.palette.text.primary,
    [theme.breakpoints.up('md')]: {
      textAlign: 'center',
    },
  },
  headline: {
    padding: theme.spacing(1, 0),
  },
  slide: {
    width: '33vw',
    [theme.breakpoints.up('sm')]: {
      width: 100,
    },
    marginRight: theme.spacing(4),
  },
  slideCircle: {
    width: '33vw',
    [theme.breakpoints.up('sm')]: {
      width: 100,
    },
  },
  featuredImage: {
    borderRadius: '100%',
  },
  title: {
    padding: theme.spacing(1),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  },
  slideshow: {
    overflow: 'visible',
    margin: 0,
  },
}))

const StoriesBlock = props => {
  const { stories, headline } = props
  const classes = useStyles()

  return (
    <Section className={classes.root}>
      <SectionHeadline>{headline}</SectionHeadline>
      <Container maxWidth="lg" className={classnames(classes.content)}>
        <Slideshow slidesPerView="auto" className={classes.slideshow}>
          <SlideshowSlides className={classes.slides}>
            {stories.map(story => (
              <SlideshowSlide className={classes.slide} key={story.key}>
                <Link component={RouterLink} href={routeMatch(story.href)} as={story.href}>
                  <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                    <Box className={classes.slideCircle}>
                      <MediaLoader width={1} height={1} lazy>
                        <Media
                          className={classes.featuredImage}
                          src={story.featuredImage}
                          component="img"
                          alt={story.featuredImageAlt ?? null}
                        />
                      </MediaLoader>
                    </Box>
                    <Typography variant="caption" color="textSecondary" className={classes.title}>
                      {story.title}
                    </Typography>
                  </Box>
                </Link>
              </SlideshowSlide>
            ))}
          </SlideshowSlides>
        </Slideshow>
      </Container>
    </Section>
  )
}

StoriesBlock.propTypes = {
  headline: PropTypes.string,
  stories: PropTypes.array.isRequired,
}

export default StoriesBlock
