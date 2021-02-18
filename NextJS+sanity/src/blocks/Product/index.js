import React from 'react'
import PropTypes from 'prop-types'
import { useAppContext } from 'containers/App/AppContext'
import Product from './Product'
import { transformMedia } from 'utils/sanity'

const EnhancedProduct = props => {
  const { product, backgroundMedia, ...other } = props
  const appContext = useAppContext()
  const [variant, setVariant] = React.useState(product.variants?.[0].name)

  const onChangeVariant = event => setVariant(event.target.value)

  return (
    <Product
      backgroundMedia={{
        ...transformMedia(
          backgroundMedia,
          {
            video: { autoPlay: true, loop: true, muted: true, playsInline: true },
          },
          { imageFormat: 'jpg' },
        ),
      }}
      variant={variant}
      onChangeVariant={onChangeVariant}
      onAddProductToCart={appContext.onAddProductToCart}
      product={{
        available: true,
        ...product,
        variants: product.variants.map(productVariant => ({
          ...productVariant,
          images: productVariant.images.map(image => transformMedia(image)),
        })),
      }}
      {...other}
    />
  )
}

EnhancedProduct.propTypes = {
  product: PropTypes.object.isRequired,
  backgroundMedia: PropTypes.object.isRequired,
}

export default EnhancedProduct
