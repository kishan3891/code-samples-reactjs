import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, ThemeProvider } from '@material-ui/core'
import { darkTheme } from 'src/theme'
import { makeStyles } from '@material-ui/core/styles'
import { DialogTitle, IconButton } from 'components'
import { CloseIcon } from 'components/icons'

const EnhancedDialog = props => {
  const { children, ...other } = props
  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog {...other}>{children}</Dialog>
    </ThemeProvider>
  )
}

EnhancedDialog.propTypes = {
  children: PropTypes.node.isRequired,
}

export default EnhancedDialog

const useStyles = makeStyles(() => ({
  dialogTitle: {
    textAlign: 'right',
  },
}))

export const DialogWithCloseButton = props => {
  const { children, onClose, ...other } = props
  const classes = useStyles()
  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog {...other}>
        <DialogTitle className={classes.dialogTitle}>
          <IconButton color="inherit" onClick={onClose}>
            <CloseIcon className={classes.closeDialogButton} />
          </IconButton>
        </DialogTitle>
        {children}
      </Dialog>
    </ThemeProvider>
  )
}

DialogWithCloseButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}
