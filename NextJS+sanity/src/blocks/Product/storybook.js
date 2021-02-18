import React from 'react'
import ProductBlock from './Product'
import { product } from 'src/api/mock'

export default { title: 'Product block' }

export const Default = () => {
  const onChangeColor = event => {
    console.log(event.target.value)
  }

  return (
    <ProductBlock
      product={product}
      attachment={{
        label: 'Download full specs PDF',
        href: 'https://google.com',
      }}
      onChangeColor={onChangeColor}
      backgroundMedia={{
        breakpoints: {
          xs:
            'https://cdn.sanity.io/images/qih6a9z9/stage/b52c3b24466dd337c0071f66066660ef56d43860-6720x4480.png?w=800',
        },
      }}
    />
  )
}
