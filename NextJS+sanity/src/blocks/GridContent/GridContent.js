import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import {
  Section,
  SectionHeadline,
  Container,
  Box,
  Typography,
  MediaLoader,
  Media,
} from 'components'

export const useStyles = makeStyles(theme => ({
  root: {},
  content: {},
  grid: {
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    '&$right': {
      alignSelf: 'flex-end',
      flexDirection: 'row-reverse',
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      margin: theme.spacing(2, 0),
      maxWidth: '60%',
    },
  },
  itemContent: {
    padding: theme.spacing(2, 0),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2),
    },
  },
  left: {},
  right: {},
  media: {
    objectFit: 'cover',
  },
  mediaLoader: {
    [theme.breakpoints.up('md')]: {
      flexBasis: '50%',
      flexShrink: 0,
    },
  },
}))

const GridContent = props => {
  const { headline, items } = props
  const classes = useStyles()

  return (
    <Section className={classes.root}>
      <SectionHeadline>{headline}</SectionHeadline>
      <Container maxWidth="lg" className={classes.content}>
        <Box className={classes.grid}>
          {items.map(item => (
            <Box
              className={classnames(classes.item, item.layout === 'right' && classes.right)}
              key={item.key}
            >
              {item.media && (
                <MediaLoader className={classes.mediaLoader} lazy>
                  <Media component="picture" className={classes.media} {...item.media} />
                </MediaLoader>
              )}
              <Box className={classes.itemContent}>
                <Typography variant="h5">{item.title}</Typography>
                <Typography>{item.text}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Section>
  )
}

GridContent.propTypes = {
  headline: PropTypes.string,
  items: PropTypes.array.isRequired,
}

export default GridContent
