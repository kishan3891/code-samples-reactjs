import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import moment from 'moment'
import {
  Section,
  Container,
  Typography,
  SectionHeadline,
  MediaLoader,
  Media,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Link,
} from 'components'
import RouterLink from 'containers/RouterLink'
import { CheckmarkIcon } from 'components/icons'
import routeMatch from 'utils/routeMatch'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'

export const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    color: theme.palette.text.primary,
  },
  featuredImage: {
    borderRadius: 4,
  },
  filterButton: {
    margin: theme.spacing(1),
    marginLeft: 0,
    border: 'none',
    width: 68,
  },
  checkmark: {
    width: 17,
    height: 17,
  },
  articles: {
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridGap: theme.spacing(2),
    },
  },
  pagination: {},
}))

const ArticleList = props => {
  const {
    headline,
    articles,
    tags,
    filter,
    onChangeFilter,
    paginationCount,
    totalArticles,
    onChangePage,
  } = props
  const classes = useStyles()

  return (
    <Section className={classes.root}>
      <SectionHeadline>{headline}</SectionHeadline>
      <Container maxWidth="lg" className={classnames(classes.content)}>
        <Typography variant="subtitle2" color="textSecondary">
          Filter by
        </Typography>
        <ToggleButtonGroup value={filter.tags} onChange={onChangeFilter} size="small">
          {tags.map(tag => (
            <ToggleButton value={tag} key={tag} className={classes.filterButton}>
              {filter.tags.includes(tag) && (
                <CheckmarkIcon fontSize="small" className={classes.checkmark} />
              )}
              <Typography variant="overline">{tag}</Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <div className={classes.articles}>
          {articles.map(
            article =>
              (filter.tags.some(tag => !article.tags || article.tags.includes(tag)) ||
                filter.tags.length === 0) && (
                <Link
                  component={RouterLink}
                  href={routeMatch(article.href)}
                  as={article.href}
                  key={article.key}
                >
                  <Box component="article" py={2}>
                    <MediaLoader width={1.57} height={1} lazy>
                      <Media
                        className={classes.featuredImage}
                        style={{ objectFit: article.fitFeaturedImage ? 'contain' : 'cover' }}
                        component="img"
                        {...article.featuredImage}
                      />
                    </MediaLoader>
                    <Typography variant="body1">{article.title}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {moment(article.published).format('MMMM DD YYYY')}
                    </Typography>
                  </Box>
                </Link>
              ),
          )}
        </div>
        <Box display="flex" justifyContent="center" className={classes.pagination}>
          <Pagination count={Math.ceil(totalArticles / paginationCount)} onChange={onChangePage} />
        </Box>
      </Container>
    </Section>
  )
}

ArticleList.propTypes = {
  headline: PropTypes.string,
  articles: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  paginationCount: PropTypes.number.isRequired,
  totalArticles: PropTypes.number.isRequired,
  filter: PropTypes.shape({
    tags: PropTypes.array.isRequired,
  }).isRequired,
  tags: PropTypes.array,
  onChangeFilter: PropTypes.func.isRequired,
}

export default ArticleList
