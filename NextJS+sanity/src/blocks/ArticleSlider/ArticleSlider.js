import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  Section,
  Container,
  Typography,
  SectionHeadline,
  Slideshow,
  SlideshowSlides,
  SlideshowSlide,
  MediaLoader,
  Media,
  Link,
} from 'components'
import RouterLink from 'containers/RouterLink'
import routeMatch from 'utils/routeMatch'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
  },
  content: {
    color: theme.palette.text.primary,
  },
  featuredImage: {
    borderRadius: 4,
  },
  slideshow: {
    marginLeft: 0,
    overflow: 'visible',
  },
  slide: {
    maxWidth: 381,
    marginRight: theme.spacing(2),
  },
  mediaLoader: {},
}))

const ArticleSlider = props => {
  const { headline, articles } = props
  const classes = useStyles()

  return (
    <Section className={classes.root}>
      <SectionHeadline>{headline}</SectionHeadline>
      <Container>
        <Slideshow slidesPerView="auto" className={classes.slideshow}>
          <SlideshowSlides>
            {articles.map(article => (
              <SlideshowSlide className={classes.slide} key={article.key}>
                <Link
                  component={RouterLink}
                  href={routeMatch(article.href)}
                  as={article.href}
                  key={article.key}
                >
                  <article>
                    <MediaLoader width={1.57} height={1} className={classes.mediaLoader} lazy>
                      <Media
                        className={classes.featuredImage}
                        style={{ objectFit: article.fitFeaturedImage ? 'contain' : 'cover' }}
                        src={article.featuredImage}
                        component="img"
                      />
                    </MediaLoader>
                    <Typography variant="body1">{article.title}</Typography>
                    <Typography variant="caption">{article.published}</Typography>
                  </article>
                </Link>
              </SlideshowSlide>
            ))}
          </SlideshowSlides>
        </Slideshow>
      </Container>
    </Section>
  )
}

ArticleSlider.propTypes = {
  headline: PropTypes.string,
  articles: PropTypes.array.isRequired,
}

export default ArticleSlider
