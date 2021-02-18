import { compose, mapProps } from 'recompose'
import { assetUrl } from 'utils/sanity'
import Stories from './Stories'

export default compose(
  mapProps(props => ({
    ...props,
    stories: props.stories.map(story => ({
      ...story,
      href: `/news/${story.slug}`,
      featuredImage: assetUrl(story.featuredImage)
        .width(240)
        .format('jpg')
        .url(),
    })),
  })),
)(Stories)
