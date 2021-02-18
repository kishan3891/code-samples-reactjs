import React from 'react'
import ArticleListBlock from './ArticleList'
import { transformMedia } from 'utils/sanity'

const tags = ['event', 'news', 'press']

export default { title: 'ArticleList block' }

function createArticles(length) {
  return Array.from({ length }).map((_, i) => ({
    key: i,
    title: `Article ${i + 1}`,
    date: new Date().toISOString(),
    href: '/article',
    featuredImage: { response: true, src: 'https://placekitten.com/248/157' },
    tags: [tags[i % tags.length]],
  }))
}

export const Default = () => {
  const [filter, setFilter] = React.useState({ tags: ['event'] })

  function onChangeFilterTag(event, value) {
    setFilter({ tags: value })
  }

  return (
    <ArticleListBlock
      headline="All Articles"
      articles={createArticles(8)}
      filter={filter}
      onChangeFilter={onChangeFilterTag}
      tags={tags}
    />
  )
}
