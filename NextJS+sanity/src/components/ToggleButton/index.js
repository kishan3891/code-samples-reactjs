import { fade } from '@material-ui/core/styles'

export { ToggleButton as default } from '@material-ui/lab'

export const styles = theme => ({
  root: {
    border: 'none',
    color: theme.palette.getContrastText(theme.palette.action.active),
    backgroundColor: theme.palette.action.selected,
    '&$selected': {
      marginLeft: 0,
      color: theme.palette.getContrastText(theme.palette.action.active),
      backgroundColor: theme.palette.action.active,
      '&:hover': {
        backgroundColor: theme.palette.action.active,
      },
      '& + &': {
        borderLeft: 0,
      },
    },
    '&$disabled': {
      color: fade(theme.palette.action.disabled, 0.12),
    },
    '&:hover': {
      textDecoration: 'none',
      // Reset on mouse devices
      backgroundColor: fade(theme.palette.text.primary, 0.05),
      '@media (hover: none)': {
        backgroundColor: theme.palette.action.selected,
      },
      '&$disabled': {
        backgroundColor: 'transparent',
      },
    },
  },
})
