import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import {
  Section,
  Container,
  Media,
  MediaLoader,
  ButtonBase,
  Button,
  Typography,
  Gallery,
  GalleryItem,
} from 'components'
import RouterLink from 'containers/RouterLink'
import routeMatch from 'utils/routeMatch'
import { ArrowForwardIcon } from 'components/icons'
import propTypes from 'api/propTypes'

export const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    color: theme.palette.text.secondary,
    textAlign: 'center',
  },
  featured: {},
  link: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    padding: '6px 15px',
    backgroundColor: theme.palette.background.overlay,
    ...theme.mixins.blur,
  },
  item: {
    display: 'flex',
  },
}))

const GalleryMenuBlock = props => {
  const { items } = props
  const classes = useStyles()

  return (
    <Section className={classes.root}>
      <Container maxWidth="lg" className={classes.content}>
        <Gallery>
          {items.map(item => (
            <GalleryItem featured={item.featured} key={item.key}>
              <ButtonBase
                component={RouterLink}
                href={routeMatch(item.link.href)}
                as={item.link.href}
                className={classes.item}
              >
                <MediaLoader width={1} height={item.featured ? 0.5 : 1} lazy>
                  <Media component="picture" {...item.media} />
                </MediaLoader>
                <Button
                  variant="contained"
                  color="secondary"
                  component="div"
                  endIcon={<ArrowForwardIcon />}
                  className={classes.link}
                >
                  <Typography variant="overline">{item.link.label}</Typography>
                </Button>
              </ButtonBase>
            </GalleryItem>
          ))}
        </Gallery>
      </Container>
    </Section>
  )
}

GalleryMenuBlock.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      media: propTypes.media.isRequired,
      featured: PropTypes.bool,
      link: propTypes.link.isRequired,
      key: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export default GalleryMenuBlock
