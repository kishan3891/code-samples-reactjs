import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Box } from 'components'
import BlockContent from '@sanity/block-content-to-react'
import { LogoFullIcon } from 'components/icons'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 0),
    ...theme.mixins.gutters(),
    borderTop: `1px solid ${theme.palette.divider}`,
    ...theme.typography.body1,
    color: theme.palette.text.secondary,
  },
  blockContent: {},
}))

const AppNavFooter = props => {
  const { global, className } = props
  const classes = useStyles()

  return (
    <Box display="flex" alignItems="center" className={classnames(classes.root, className)}>
      <BlockContent className={classes.blockContent} blocks={global?.legal} />
      <Box flexGrow={1} />
      <LogoFullIcon fontSize="large" />
    </Box>
  )
}

AppNavFooter.propTypes = {
  className: PropTypes.string,
  global: PropTypes.object,
}

export default AppNavFooter
