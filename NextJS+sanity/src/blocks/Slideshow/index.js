import { compose, mapProps } from 'recompose'
import Slideshow from './Slideshow'
import { transformMedia } from 'utils/sanity'

export default compose(
  mapProps(props => {
    return {
      ...props,
      images: props.images.map(image =>
        transformMedia(image, {
          video: { autoPlay: true, loop: true, muted: true, playsInline: true },
        }),
      ),
    }
  }),
)(Slideshow)
