import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Divider } from 'components'

export const useStyles = makeStyles(theme => ({
  root: {},
  divider: {
    margin: theme.spacing(1, 0),
  },
}))

const SectionHeadline = props => {
  const { children, className, ...other } = props
  const classes = useStyles()

  return (
    <Container component="header" className={classnames(classes.root, className)} {...other}>
      <Typography variant="subtitle1">{children}</Typography>
      <Divider className={classes.divider} />
    </Container>
  )
}

SectionHeadline.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default SectionHeadline
