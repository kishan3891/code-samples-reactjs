import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  root: {
    padding: 1,
    flexBasis: '50%',
    '&$featured': {
      flexBasis: '100%',
    },
    [theme.breakpoints.up('md')]: {
      flexBasis: '25%',
      '&$featured': {
        flexBasis: '50%',
      },
    },
  },
  featured: {},
}))

const GalleryItem = props => {
  const { children, className, featured, ...other } = props
  const classes = useStyles()

  return (
    <div className={classnames(classes.root, className, featured && classes.featured)} {...other}>
      {children}
    </div>
  )
}

GalleryItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  featured: PropTypes.bool,
}

export default GalleryItem
