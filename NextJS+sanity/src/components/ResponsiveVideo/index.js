import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { lightTheme as theme } from 'src/theme'

export const useStyles = makeStyles({
  root: {},
})

const ResponsiveVideo = props => {
  const { breakpoints, className, ...other } = props
  const classes = useStyles()
  const [src, setSrc] = React.useState(breakpoints.xs)
  const breakpointValues = theme.breakpoints.values

  const handleResize = React.useCallback(() => {
    let newSrc = src
    const sortedBreakpoints = Object.keys(breakpoints).sort(
      (a, b) => breakpointValues[a] - breakpointValues[b],
    )
    sortedBreakpoints.forEach(breakpoint => {
      if (window.innerWidth >= breakpointValues[breakpoint]) {
        newSrc = breakpoints[breakpoint]
      }
    })
    setSrc(newSrc)
  }, [breakpointValues, breakpoints, src])

  React.useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return <video className={classnames(classes.root, className)} muted src={src} {...other} />
}

ResponsiveVideo.propTypes = {
  className: PropTypes.string,
  breakpoints: PropTypes.object,
}

export default ResponsiveVideo
