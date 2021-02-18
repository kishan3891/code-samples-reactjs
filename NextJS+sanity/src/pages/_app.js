import React from 'react'
import NextApp from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { lightTheme, darkTheme } from 'src/theme'
import App from 'containers/App'
import sanity from 'api/sanity'
import groq from 'api/sanity/groq'
import { TranslationsProvider } from 'src/i18n'
import Head from 'next/head'
import Router from 'next/router'

import 'utils/polyfills'

const shades = {
  light: lightTheme,
  dark: darkTheme,
}

export default class MainApp extends NextApp {
  componentDidMount() {
    
    const { asPath } = Router;
    if (asPath === '/?kw=brand&gclid=EAIaIQobChMIz7aZn4b64gIVDJ3tCh28dQSlEAAYASAAEgLhUPD_BwE') {
      Router.push('/')
    }
    
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps, navigation, footer, global } = this.props
    const translationStrings = JSON.parse(global.translations.code)

    const theme = shades[pageProps?.properties?.shade || 'light']
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty(
        `--root-theme-background-color`,
        theme.palette.background.default,
      )
    }

    return (
      <>
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.background.default} />
        </Head>
        {/* ThemeProvider for App */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TranslationsProvider translations={translationStrings}>
            <App footer={footer} global={global} navigation={navigation}>
              <Component {...pageProps} />
            </App>
          </TranslationsProvider>
        </ThemeProvider>
      </>
    )
  }
}

MainApp.getInitialProps = async ({ Component, ctx }) => {
  // fetch global configurations from sanity
  const globals = await sanity.fetch(groq.globals)
  const { navigation, footer, global } = globals
  const pageProps = await Component.getInitialProps(ctx)
  return { navigation, footer, global, pageProps }
}
