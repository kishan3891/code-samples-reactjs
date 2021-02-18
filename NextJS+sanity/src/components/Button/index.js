export { Button as default } from '@material-ui/core'

export const styles = theme => ({
  contained: {
    padding: '11px 15px',
    backgroundColor: theme.palette.action.active,
    color: theme.palette.getContrastText(theme.palette.action.active),
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
      '@media (hover: none)': {
        boxShadow: 'none',
      },
    },
  },
  containedSizeLarge: {
    padding: '19px 22px',
  },
  outlinedSizeLarge: {
    padding: '19px 22px',
  },
  outlined: {
    padding: '11px 15px',
  },
  outlinedPrimary: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
})
