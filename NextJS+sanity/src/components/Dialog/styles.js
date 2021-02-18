export const styles = theme => ({
  paper: {
    color: theme.palette.getContrastText(theme.palette.background.paper),
    ...theme.mixins.blur,
  },
})
