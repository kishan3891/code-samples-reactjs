import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { ButtonBase } from 'components'

export const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    flexBasis: '50%',
    textAlign: 'center',
    height: 0,
    paddingBottom: '50%',
    '&:first-child': {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
}))

const AppDrawerPrimaryItem = props => {
  const { children, className, ...other } = props
  const classes = useStyles()

  return (
    <ButtonBase className={classnames(classes.root, className)} {...other}>
      <div className={classes.wrapper}>
        <div className={classes.inner}>{children}</div>
      </div>
    </ButtonBase>
  )
}

AppDrawerPrimaryItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default AppDrawerPrimaryItem
