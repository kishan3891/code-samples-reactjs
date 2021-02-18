import { compose, mapProps } from 'recompose'
import GridContent from './GridContent'
import { transformMedia } from 'utils/sanity'

export default compose(
  mapProps(props => ({
    ...props,
    items: props.items.map(item => ({
      ...item,
      media:
        item.media &&
        transformMedia(item.media, {
          video: { autoPlay: true, loop: true, muted: true, playsInline: true },
        }),
    })),
  })),
)(GridContent)
