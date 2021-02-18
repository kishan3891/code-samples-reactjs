import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import NewsletterForm from 'containers/NewsletterForm'
import { Section, SectionHeadline, Container, Typography } from 'components'

export const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      maxWidth: theme.breakpoints.values.sm,
    },
  },
}))

const NewsletterBlock = props => {
  const { showContactType, headline, text, mailchimpUrl, successMessage } = props
  const classes = useStyles()

  return (
    <Section className={classes.root}>
      {headline && <SectionHeadline>{headline}</SectionHeadline>}
      <Container maxWidth="lg" className={classes.content}>
        {text && (
          <Typography paragraph variant="h5">
            {text}
          </Typography>
        )}
        <NewsletterForm
          className={classes.form}
          showContactType={showContactType}
          mailchimpUrl={mailchimpUrl}
          successMessage={successMessage}
        />
      </Container>
    </Section>
  )
}

NewsletterBlock.propTypes = {
  showContactType: PropTypes.bool,
  headline: PropTypes.string,
  text: PropTypes.string,
  mailchimpUrl: PropTypes.string.isRequired,
  successMessage: PropTypes.string,
}

export default NewsletterBlock
