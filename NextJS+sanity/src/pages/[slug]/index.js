import React from 'react'
import PropTypes from 'prop-types'
import PageComponent from 'components/Page'
import sanity from 'src/api/sanity'
import * as blockComponents from 'src/blocks'
import groq from 'api/sanity/groq'
import { Section, Box, Typography } from 'components'
import { InView } from 'react-intersection-observer'
import { useAppContext } from 'containers/App/AppContext'

const BlockNotFound = () => (
  <Section>
    <Box py={10}>
      <Typography>Block not found</Typography>
    </Box>
  </Section>
)

const Page = props => {
  const { blocks, title, description, featuredImage } = props

  const { onShadeChange } = useAppContext()

  const handleBlockInView = React.useCallback(
    blockProps => inView => {
      // if block has a shade defined, run App.handleShadeChange
      if (inView) {
        onShadeChange(blockProps.shade || 'dark')
      }
    },
    [onShadeChange],
  )

  return (
    <PageComponent title={title} description={description} featuredImage={featuredImage}>
      {blocks.map(({ _key, _type, ...blockProps }) => {
        const block = blockComponents[_type]
        return block ? (
          <InView
            onChange={handleBlockInView(blockProps)}
            rootMargin="0px 0px -100%"
            key={blockProps.key}
          >
            {({ ref, entry }) => {
              return (
                <div ref={ref}>
                  {React.createElement(blockComponents[_type], {
                    rootElement: entry?.target,
                    ...blockProps,
                  })}
                </div>
              )
            }}
          </InView>
        ) : (
          <BlockNotFound />
        )
      })}
    </PageComponent>
  )
}

Page.getInitialProps = async ({ query }) => {
  // fetch page from sanity
  const response = await sanity.fetch(groq.page(query.slug || 'home'))
  return { ...response }
}

Page.propTypes = {
  blocks: PropTypes.array.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  featuredImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export default Page
