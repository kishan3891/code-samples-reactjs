import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Media from '@oakwood/oui/Media'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  root: {},
  objectPosition: {
    '& img': {
      objectPosition: ({ hotspot }) => hotspot && `${hotspot.x * 100}% ${hotspot.y * 100}%`,
    },
  },
})

const EnhancedMedia = React.forwardRef((props, ref) => {
  const { className, hotspot, ...other } = props
  const classes = useStyles(props)

  return (
    <Media
      ref={ref}
      className={classnames(classes.root, hotspot && classes.objectPosition, className)}
      {...other}
    />
  )
})

EnhancedMedia.propTypes = {
  hotspot: PropTypes.object,
  className: PropTypes.string,
}

export default EnhancedMedia
