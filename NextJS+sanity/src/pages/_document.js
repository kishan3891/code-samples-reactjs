import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta
            name="google-site-verification"
            content="1rFtf_ya1WriePpobNXz3nskSqYEMUSvGo67lYyFWQs"
          />
          {/* GTM */}
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/favicon-194x194.png" sizes="194x194" />
          {/* Google Tag Manager */}
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NR2SDQ9');`,
            }}
          />
          <style
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `@font-face {
                font-family: 'Gotham';
                font-weight: 500;
                font-display: swap;
                src: url('/fonts/Gotham-Medium.otf') format('opentype');
              }
              @font-face {
                font-family: 'Gotham';
                font-weight: 700;
                font-display: swap;
                src: url('/fonts/Gotham-Bold.otf') format('opentype');
              }
              @font-face {
                font-family: 'Gotham';
                font-weight: 400;
                font-display: swap;
                src: url('/fonts/Gotham-Book.otf') format('opentype');
              }
              @font-face {
                font-family: 'Caslon';
                font-weight: 500;
                font-display: swap;
                src: url('/fonts/ACaslonPro-Regular.woff') format('woff');
              }
              `,
            }}
          />
        </Head>
        <body>
          <noscript>
            {/* eslint-disable-next-line jsx-a11y/iframe-has-title  */}
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-NR2SDQ9"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => {
        return sheets.collect(<App {...props} />)
      },
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  }
}
