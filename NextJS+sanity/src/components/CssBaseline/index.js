const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.background.default,
      transition: theme.transitions.create(['background-color']),
    },
    img: {
      maxWidth: '100%',
    },
    'strong, b': {
      fontWeight: 700,
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
})

export default styles
