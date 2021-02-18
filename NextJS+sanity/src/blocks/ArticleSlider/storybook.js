import React from 'react'
import ArticleSliderBlock from './ArticleSlider'

export default { title: 'ArticleSlider block' }

function createArticles(length) {
  return Array.from({ length }).map((_, i) => ({
    key: i,
    title: `Article ${i + 1}`,
    date: new Date().toISOString(),
    href: '/article',
    featuredImage: 'https://placekitten.com/248/157',
  }))
}

export const Default = () => (
  <ArticleSliderBlock
    headline="Upcoming Events"
    link={{
      label: 'See all events',
      href: '/events',
    }}
    articles={createArticles(8)}
    tag="event"
  />
)
