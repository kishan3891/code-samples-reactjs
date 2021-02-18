import React from 'react'
import ProductListBlock from './ProductList'
import { product } from 'src/api/mock'

export default { title: 'ProductList block' }

const products = Array.from({ length: 3 }).map((_, i) => ({ ...product, key: i }))

export const Default = () => {
  return <ProductListBlock products={products} />
}
