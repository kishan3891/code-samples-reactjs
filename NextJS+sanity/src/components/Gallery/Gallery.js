import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from 'components'

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
})

const Gallery = props => {
  const { children, className, ...other } = props
  const classes = useStyles()

  return (
    <Box className={classnames(classes.root, className)} {...other}>
      {children}
    </Box>
  )
}

Gallery.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default Gallery
