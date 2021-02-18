import React from 'react'
import WysiwygBlock from './Wysiwyg'
import { boolean, text, object } from '@storybook/addon-knobs'
import { withKnobs } from '@storybook/addon-knobs'
import * as icons from 'components/icons'

export default { title: 'Wysiwyg block' }

export const Default = props => (
  <WysiwygBlock
    content={[
      {
        _key: 'a15e73615201',
        _type: 'block',
        children: [
          {
            _key: 'a15e736152010',
            _type: 'span',
            marks: [],
            text:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit at odio tincidunt risus, magna scelerisque fringilla. Quis tristique eu feugiat est tempor et.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
      {
        _key: 'e231b678c4be',
        _type: 'block',
        children: [
          {
            _key: 'e231b678c4be0',
            _type: 'span',
            marks: [],
            text:
              'Nibh facilisi lorem quam venenatis, dui vehicula quis egestas tincidunt. Sed nunc mi convallis elementum orci dui metus. Aliquam dignissim duis bibendum pretium, magnis nulla. Orci, blandit porta leo, volutpat cursus at dictum dui integer.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
      {
        _key: 'e978b88cfb8e',
        _type: 'block',
        children: [
          {
            _key: 'e978b88cfb8e0',
            _type: 'span',
            marks: ['strong'],
            text: 'Dolor sit amen\n',
          },
          {
            _key: 'e978b88cfb8e1',
            _type: 'span',
            marks: [],
            text:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit at odio tincidunt risus, magna scelerisque fringilla. Quis tristique eu feugiat est tempor et.',
          },
          {
            _key: 'e978b88cfb8e2',
            _type: 'span',
            marks: ['strong'],
            text: '',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ]}
  />
)
