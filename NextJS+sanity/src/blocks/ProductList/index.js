import { compose, mapProps } from 'recompose'
import ProductList from './ProductList'
import { transformMedia } from 'utils/sanity'

export default compose(
  mapProps(props => ({
    ...props,
    products: props.products.map(product => ({
      available: true,
      ...product,
      variants: product.variants.map(productVariant => ({
        ...productVariant,
        images: productVariant.images.map(image => transformMedia(image)),
      })),
    })),
  })),
)(ProductList)
