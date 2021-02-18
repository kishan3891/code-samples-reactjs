import React from 'react'
import PropTypes from 'prop-types'
import Gallery from './Gallery'
import { transformMedia } from 'utils/sanity'

const EnhancedGallery = ({ items, ...other }) => {
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
    <Gallery
      onClickMedia={onClickMedia}
      onCloseDialog={onCloseDialog}
      index={index}
      dialogOpen={dialogOpen}
      items={items.map(item => {
        const { media, ...rest } = item
        return {
          media:
            media.url ||
            transformMedia(
              media,
              {
                video: { autoPlay: true, loop: true, muted: true, playsInline: true },
              },
              { imageFormat: 'jpg' },
            ),
          ...rest,
        }
      })}
      {...other}
    />
  )
}

EnhancedGallery.propTypes = {
  items: PropTypes.array.isRequired,
}

export default EnhancedGallery
