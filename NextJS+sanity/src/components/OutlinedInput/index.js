export { OutlinedInput as default } from '@material-ui/core'

export const styles = theme => ({
  input: {
    '&:-webkit-autofill': {
      WebkitBoxShadow:
        theme.palette.type === 'dark' ? `0 0 0 100px ${theme.palette.grey[700]} inset` : null,
      WebkitTextFillColor: theme.palette.type === 'dark' ? '#fff' : null,
    },
  },
})
