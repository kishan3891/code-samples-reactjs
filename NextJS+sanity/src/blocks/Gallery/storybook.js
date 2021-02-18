import React from 'react'
import GalleryBlock from './Gallery'

export default { title: 'Gallery block' }

export const Default = () => {
  const [index, setIndex] = React.useState(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  function onClickMedia(i) {
    setIndex(i)
    setDialogOpen(true)
  }
  function onCloseDialog() {
    setDialogOpen(false)
  }
  return (
    <GalleryBlock
      headline="Images"
      onClickMedia={onClickMedia}
      onCloseDialog={onCloseDialog}
      index={index}
      dialogOpen={dialogOpen}
      items={[
        {
          media: {
            breakpoints: {
              xs: 'https://placekitten.com/800/800',
            },
          },
          featured: true,
          key: '0',
        },
        {
          media: {
            breakpoints: {
              xs:
                'https://storage.coverr.co/videos/Boat on Lake?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjExNDMyN0NEOTRCMUFCMTFERTE3IiwiaWF0IjoxNTc4MDQyNjE4fQ.cUR0Zz0MgV613i5hZgYJT0qUUrgq-my8nRxM6emHUTY',
            },
            component: 'video',
            autoPlay: true,
            muted: true,
            loop: true,
          },
          featured: true,
          key: '1',
        },
        {
          media: {
            breakpoints: {
              xs: 'https://placekitten.com/800/800',
            },
          },
          key: '2',
        },
        {
          media: {
            breakpoints: {
              xs:
                'https://storage.coverr.co/videos/Boat on Lake?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjExNDMyN0NEOTRCMUFCMTFERTE3IiwiaWF0IjoxNTc4MDQyNjE4fQ.cUR0Zz0MgV613i5hZgYJT0qUUrgq-my8nRxM6emHUTY',
            },
            component: 'video',
            autoPlay: true,
            muted: true,
            loop: true,
          },
          key: '3',
        },
      ]}
    />
  )
}
