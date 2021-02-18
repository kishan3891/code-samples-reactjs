import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { Radio } from 'components'

export const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    width: 26,
    height: 26,
    [theme.breakpoints.up('md')]: {
      width: 40,
      height: 40,
    },
  },
  checked: {},
  swatch: {
    borderRadius: 26,
    '&$checked': {
      '&:before': {
        content: '""',
        position: 'absolute',
        left: -2,
        top: -2,
        width: 'calc(100% + 4px)',
        height: 'calc(100% + 4px)',
        border: '1px solid',
        borderColor: 'inherit',
        borderRadius: 26,
      },
    },
  },
}))

const Swatch = React.forwardRef((props, ref) => {
  const { className, color, checked, ...other } = props
  const classes = useStyles()

  return (
    <Radio
      className={classnames(classes.root, className)}
      ref={ref}
      icon={<span className={classes.swatch} />}
      checkedIcon={<span className={classnames(classes.swatch, classes.checked)} />}
      style={{ backgroundColor: color }}
      {...other}
    />
  )
})

Swatch.propTypes = {
  color: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  className: PropTypes.string,
}

export default Swatch
