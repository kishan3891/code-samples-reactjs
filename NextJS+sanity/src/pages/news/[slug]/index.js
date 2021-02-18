import React from 'react'
import PropTypes from 'prop-types'
import PageComponent from 'components/Page'
import sanity from 'src/api/sanity'
import WysiwygBlock from 'blocks/Wysiwyg'
import HeaderBlock from 'blocks/Header'
import groq from 'api/sanity/groq'
import moment from 'moment'

const BLOCKS = {
  WysiwygBlock,
}

const NewsPage = props => {
  const { block, title, description, featuredImage, published, headerMedia } = props
  const { _type, _key, ...blockProps } = block

  return (
    <PageComponent title={title} description={description} featuredImage={featuredImage}>
      <HeaderBlock
        headline={title}
        subheadline={moment(published).format('MMMM DD YYYY')}
        backgroundMedia={headerMedia ?? { disableSrcSet: true, src: '/images/default-header.jpg' }}
      />
      {React.createElement(BLOCKS[_type], { key: _key, ...blockProps })}
    </PageComponent>
  )
}

NewsPage.getInitialProps = async ({ query }) => {
  // fetch news page from sanity
  const response = await sanity.fetch(groq.news(query.slug))
  return { ...response }
}

NewsPage.propTypes = {
  block: PropTypes.object.isRequired,
  title: PropTypes.string,
  published: PropTypes.string.isRequired,
  headerMedia: PropTypes.object,
  description: PropTypes.string,
  featuredImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export default NewsPage
