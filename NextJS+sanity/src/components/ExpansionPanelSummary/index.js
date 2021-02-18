export { ExpansionPanelSummary as default } from '@material-ui/core'

export const styles = () => ({
  root: {
    padding: 0,
    minHeight: 0,
    '&$expanded': {
      minHeight: 0,
    },
  },
  content: {
    margin: 0,
    '&$expanded': {
      margin: 0,
    },
  },
})
