import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer } from 'components'
import { SITE_HEADER_ID } from 'src/site.config'

export const useStyles = makeStyles(theme => ({
  root: {},
  paper: {
    width: '100%',
    top: `var(--${SITE_HEADER_ID}-height)`,
    height: `calc(100% - var(--${SITE_HEADER_ID}-height))`,
    [theme.breakpoints.up('md')]: {
      maxWidth: 504,
    },
    boxShadow: 'none',
  },
}))

const AppDrawer = props => {
  const { children, className, onClose, ...other } = props
  const classes = useStyles()
  return (
    <Drawer
      className={classnames(classes.root, className)}
      classes={{ paper: classes.paper }}
      ModalProps={{
        disablePortal: true,
        style: {
          zIndex: 500,
        },
      }}
      onClose={onClose}
      {...other}
    >
      {children}
    </Drawer>
  )
}

AppDrawer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}

export default AppDrawer
