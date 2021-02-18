import React from 'react'
import HeroBlock from './Hero'
import { boolean, text, object } from '@storybook/addon-knobs'
import { withKnobs } from '@storybook/addon-knobs'
import * as icons from 'components/icons'

export default { title: 'Hero block' }

export const Default = props => (
  <HeroBlock
    heading={text('heading', '100% electric craft made in Sweden')}
    showLogo={boolean('showLogo', true)}
    backgroundMedia={{
      breakpoints: {
        xs:
          'https://cdn.sanity.io/images/qih6a9z9/stage/281b48b37c58779b702cf1f69d3d5b923187e409-2500x1667.png',
      },
    }}
    cta={object('cta', {
      link: { href: '/products', label: 'buy your craft today' },
    })}
  />
)

export const Logo = props => (
  <HeroBlock
    heading={text('heading', '100% electric craft made in Sweden')}
    showLogo={boolean('showLogo', true)}
    backgroundMedia={{
      breakpoints: {
        xs:
          'https://cdn.sanity.io/images/qih6a9z9/stage/281b48b37c58779b702cf1f69d3d5b923187e409-2500x1667.png',
      },
    }}
  />
)

export const Cta = props => (
  <HeroBlock
    heading={text('heading', '100% electric craft made in Sweden')}
    showLogo={boolean('showLogo', false)}
    backgroundMedia={{
      breakpoints: {
        xs:
          'https://cdn.sanity.io/images/qih6a9z9/stage/281b48b37c58779b702cf1f69d3d5b923187e409-2500x1667.png',
      },
    }}
    cta={object('cta', {
      link: { href: '/products', label: 'buy your craft today' },
    })}
  />
)
