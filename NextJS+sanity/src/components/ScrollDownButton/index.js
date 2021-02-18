import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { ChevronDownIcon } from 'components/icons'
import IconButton from 'components/IconButton'
import scrollIntoView from 'scroll-into-view'

export const useStyles = makeStyles({
  '@keyframes animation': {
    '0%': {
      transform: 'translateY(-5px)',
    },
    '50%': {
      transform: 'translateY(5px)',
    },
    '100%': {
      transform: 'translateY(-5px)',
    },
  },
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  arrow: {
    animation: '$animation 2s infinite',
  },
})

const ScrollDownButton = props => {
  const { className, scrollElement, ...other } = props
  const classes = useStyles()

  const handleClick = React.useCallback(() => {
    if (scrollElement) {
      const nextNode = scrollElement.nextSibling
      scrollIntoView(nextNode)
    }
  }, [scrollElement])

  return (
    <IconButton
      className={classnames(classes.root, className)}
      color="inherit"
      onClick={handleClick}
      {...other}
    >
      <ChevronDownIcon className={classes.arrow} />
    </IconButton>
  )
}

ScrollDownButton.propTypes = {
  className: PropTypes.string,
  scrollElement: PropTypes.object,
}

export default ScrollDownButton
