import createTheme from 'src/components/styles/createTheme'

export const lightTheme = createTheme({ palette: { type: 'light' } })
export const darkTheme = createTheme({ palette: { type: 'dark' } })

export default {
  dark: darkTheme,
  light: lightTheme,
}
