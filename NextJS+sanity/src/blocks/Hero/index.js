import React from 'react'
import PropTypes from 'prop-types'
import HeroBlock from './Hero'
import { ThemeProvider } from '@material-ui/core'
import { lightTheme, darkTheme } from 'src/theme'

const theme = {
  light: lightTheme,
  dark: darkTheme,
}

const EnhancedHeroBlock = ({ shade, ...other }) => {
  return shade ? (
    <ThemeProvider theme={theme[shade]}>
      <HeroBlock {...other} />
    </ThemeProvider>
  ) : (
    <HeroBlock {...other} />
  )
}

EnhancedHeroBlock.propTypes = {
  shade: PropTypes.string,
}

export default EnhancedHeroBlock
