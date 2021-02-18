export { Chip as default } from '@material-ui/core'

export const styles = theme => ({
  root: {
    backgroundColor: theme.palette.grey[500],
    ...theme.typography.overline,
  },
})
