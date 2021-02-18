import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Section, Container, Typography } from 'components'
import ScrollDownButton from 'components/ScrollDownButton'

export const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    color: theme.palette.getContrastText(theme.palette.background.default),
    textAlign: 'center',
    maxWidth: 800,
  },
  quote: {
    ...theme.typography.special,
    [theme.breakpoints.up('md')]: {
      ...theme.typography.specialBig,
    },
  },
  scrollDownArrow: {
    position: 'absolute',
    bottom: -12,
    left: '50%',
    transform: 'translateX(-50%)',
  },
}))

const Quote = props => {
  const { quote, rootElement } = props
  const classes = useStyles()

  return (
    <Section className={classes.root}>
      <Container className={classes.content}>
        <Typography className={classes.quote}>{quote}</Typography>
      </Container>
      {rootElement && rootElement.nextSibling && (
        <ScrollDownButton scrollElement={rootElement} className={classes.scrollDownArrow} />
      )}
    </Section>
  )
}

Quote.propTypes = {
  quote: PropTypes.string.isRequired,
  rootElement: PropTypes.object,
}

export default Quote
