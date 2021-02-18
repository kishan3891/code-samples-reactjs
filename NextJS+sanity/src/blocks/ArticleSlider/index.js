import { compose, mapProps } from 'recompose'
import ArticleSlider from './ArticleSlider'
import { assetUrl } from 'utils/sanity'
import moment from 'moment'

export default compose(
  mapProps(props => ({
    ...props,
    articles: props.articles.map(article => ({
      ...article,
      href: `/news/${article.slug}`,
      published: moment(article.published).format('MMMM DD YYYY'),
      featuredImage: assetUrl(article.featuredImage)
        .width(410)
        .url(),
    })),
  })),
)(ArticleSlider)
