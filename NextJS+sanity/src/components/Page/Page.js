import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import useTranslations from 'src/i18n'
import { assetUrl } from 'utils/sanity'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  root: {},
}))

const Page = props => {
  const translations = useTranslations()
  const {
    children,
    title = translations`meta.title`,
    description = translations`meta.description`,
    featuredImage,
  } = props
  const classes = useStyles()

  // transform featuredImage if coming from cms
  let shareImage = featuredImage
  if (featuredImage?.asset) {
    shareImage = assetUrl(featuredImage)
      .width(1200)
      .height(630)
      .url()
  }

  return (
    <main className={classes.root}>
      <Head>
        <title>{title ? `${translations`meta.title`} – ${title}` : translations`meta.title`}</title>
        <meta
          name="og:title"
          content={title ? `${translations`meta.title`} – ${title}` : translations`meta.title`}
        />
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content={translations`meta.twitterAccount`} />
        <meta name="twitter:site" content={translations`meta.twitterAccount`} />
        <meta name="og:image" content={shareImage} />
        <meta name="twitter:image" content={shareImage} />
      </Head>
      {children}
    </main>
  )
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  featuredImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export default Page
