import React from 'react'
import StoriesBlock from './Stories'

export default { title: 'Stories block' }

export const Default = () => (
  <StoriesBlock
    title="X Shore right now"
    stories={[
      {
        title: 'A news',
        featuredImage: 'https://placekitten.com/500/500',
        tag: 'news',
        slug: 'a-news',
        href: 'news/something',
        key: '1',
      },
      {
        title: 'A news',
        featuredImage: 'https://placekitten.com/500/500',
        tag: 'news',
        slug: 'a-news2',
        href: 'news/something',
        key: '2',
      },
      {
        title: 'A news',
        featuredImage: 'https://placekitten.com/500/500',
        tag: 'news',
        slug: 'a-news3',
        href: 'news/something',
        key: '3',
      },
      {
        title: 'A news',
        featuredImage: 'https://placekitten.com/500/500',
        tag: 'news',
        slug: 'a-news4',
        href: 'news/something',
        key: '4',
      },
      {
        title: 'A news',
        featuredImage: 'https://placekitten.com/500/500',
        tag: 'news',
        slug: 'a-news5',
        href: 'news/something',
        key: '5',
      },
    ]}
  />
)
