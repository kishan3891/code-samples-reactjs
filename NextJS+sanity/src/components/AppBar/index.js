export { AppBar as default } from '@material-ui/core'

export const styles = theme => ({
  root: {
    ...theme.mixins.blur,
  },
  positionFixed: {
    width: 'calc(100% - var(--product-drawer-width))',
    left: 0,
  },
  colorDefault: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
  },
})
