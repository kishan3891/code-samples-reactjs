import React from 'react'
import { AppStory } from 'containers/App/storybook'
import { PageStory } from 'components/Page/storybook'
import { Default as HeroStory } from 'blocks/Hero/storybook'
import { Default as HeaderStory } from 'blocks/Header/storybook'
import { Default as WysiwygStory } from 'blocks/Wysiwyg/storybook'
import { Default as StoriesStory } from 'blocks/Stories/storybook'
import { Default as ArticleSliderStory } from 'blocks/ArticleSlider/storybook'
import { Default as ArticleListStory } from 'blocks/ArticleList/storybook'
import { Default as GalleryMenuStory } from 'blocks/GalleryMenu/storybook'
import { Default as ProductListStory } from 'blocks/ProductList/storybook'
import { Default as QuoteStory } from 'blocks/Quote/storybook'

export default { title: 'Pages' }

export const Home = () => (
  <AppStory>
    <PageStory>
      <HeroStory />
      <StoriesStory />
      <GalleryMenuStory />
    </PageStory>
  </AppStory>
)

export const NewsItemPage = () => (
  <AppStory>
    <PageStory>
      <HeaderStory />
      <WysiwygStory />
    </PageStory>
  </AppStory>
)

export const NewsPage = () => (
  <AppStory>
    <PageStory>
      <HeaderStory />
      <ArticleSliderStory />
      <ArticleListStory />
    </PageStory>
  </AppStory>
)

export const ProductListPage = () => (
  <AppStory>
    <PageStory>
      <HeaderStory />
      <QuoteStory />
      <ProductListStory />
    </PageStory>
  </AppStory>
)
