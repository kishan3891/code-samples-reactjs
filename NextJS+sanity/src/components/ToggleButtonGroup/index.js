export { ToggleButtonGroup as default } from '@material-ui/lab'

export const styles = () => ({
  root: {
    backgroundColor: 'transparent',
  },
  grouped: {
    padding: '',
    '&:not(:first-child)': {
      marginLeft: '',
      borderLeft: '',
      borderTopLeftRadius: '',
      borderBottomLeftRadius: '',
    },
    '&:not(:last-child)': {
      borderTopRightRadius: '',
      borderBottomRightRadius: '',
    },
  },
})
