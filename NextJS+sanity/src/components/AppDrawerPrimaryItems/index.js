import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
})

const AppDrawerPrimaryItems = props => {
  const { children, className, ...other } = props
  const classes = useStyles()

  return (
    <div className={classnames(classes.root, className)} {...other}>
      {children}
    </div>
  )
}

AppDrawerPrimaryItems.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default AppDrawerPrimaryItems
