import React from 'react'
import GalleryMenuBlock from './GalleryMenu'

export default { title: 'GalleryMenu block' }

function createItem(featured, key) {
  return {
    media: {
      breakpoints: {
        xs: 'https://placekitten.com/800/800',
      },
    },
    featured,
    link: {
      label: 'The boats',
      href: '/products',
    },
    key,
  }
}

const FEATURED_INDEXES = [0, 1]

export const Default = () => (
  <GalleryMenuBlock
    items={Array.from({ length: 8 }).map((item, i) =>
      createItem(FEATURED_INDEXES.includes(i), i.toString()),
    )}
  />
)
