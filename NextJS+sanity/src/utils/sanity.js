import imageUrl from '@sanity/image-url'
import sanity from 'api/sanity'
import { lightTheme as theme } from 'src/theme'
import { isEmpty } from 'lodash'

const imageUrlBuilder = imageUrl(sanity)

export function assetUrl(source) {
  return imageUrlBuilder.image(source)
}

export function transformMedia(media, props = {}, options = {}) {
  const { responsive, src, breakpoints, component, properties, ...other } = media
  const keys = theme.breakpoints.keys
  const { imageFormat = 'png', breakpointsOverride } = options

  const componentProps = props[component]
  if (componentProps && component) componentProps.component = component

  const result = {
    ...componentProps,
    ...properties,
    ...other,
  }

  if (src && src.hotspot) result.hotspot = src.hotspot

  // build urls using sanity url-builder
  if (responsive) {
    result.breakpoints = keys.reduce((acc, key, i) => {
      let nextKey = keys[Math.min(i + 1, keys.length - 1)]
      const breakpointOverride = breakpointsOverride?.[key]
      if (breakpointOverride) {
        nextKey = breakpointOverride
      }
      const urlBuilder = assetUrl(src)
      acc[key] = urlBuilder
        .width(theme.breakpoints.values[nextKey])
        .format(imageFormat)
        .auto('format')
        .url()
      return acc
    }, {})
    return result
  }

  const availableKeys = Object.keys(breakpoints)
  result.breakpoints = availableKeys.reduce((acc, key) => {
    const breakpoint = breakpoints[key]
    if (breakpoint._type === 'file') {
      // image-url builder doesn't support file type assets
      const [, refId, refExtension] = breakpoint.asset._ref.split('-')
      acc[
        key
      ] = `https://cdn.sanity.io/files/${process.env.SANITY_ID}/${process.env.ENVIRONMENT}/${refId}.${refExtension}`
    } else if (breakpoint._type === 'image') {
      const urlBuilder = assetUrl(breakpoint)
      acc[key] = urlBuilder
        .format(imageFormat)
        .auto('format')
        .url()
    } else if (!isEmpty(breakpoint)) {
      acc[key] = breakpoint
    }
    return acc
  }, {})
  return result
}

export function createSanityImageSrc(media, width) {
  const urlBuilder = assetUrl(media)
  return urlBuilder.width(width).url()
}

export function createSanityImageSrcSet(asset, widths) {
  const urlBuilder = assetUrl(asset)
  const srcSet = widths.reduce((acc, width, i) => {
    // eslint-disable-next-line no-param-reassign
    acc += `${urlBuilder.width(width).url()} ${width}w`
    // eslint-disable-next-line no-param-reassign
    if (i < widths.length - 1) acc += ', '
    return acc
  }, '')
  return srcSet
}

export function createSanityImageSources(media, dimensions) {
  const { breakpoints } = media
  const breakpointValues = theme.breakpoints.values

  const sortedBreakpoints = Object.keys(breakpoints)
    .sort((a, b) => breakpointValues[a] - breakpointValues[b])
    .reverse()

  const sources = sortedBreakpoints.map(breakpoint => {
    const widths = dimensions[breakpoint].srcSet
    const srcSet = createSanityImageSrcSet(breakpoints[breakpoint], widths)

    return {
      srcSet,
      sizes: dimensions[breakpoint].sizes,
      media: `(min-width: ${breakpointValues[breakpoint]}px)`,
    }
  })

  return sources
}

export function createSanityVideoBreakpoints(media) {
  const { breakpoints } = media
  return Object.keys(breakpoints)?.reduce((acc, key) => {
    const breakpoint = breakpoints[key]
    if (breakpoint._type === 'file') {
      const [, refId, refExtension] = breakpoint.asset._ref.split('-')
      acc[
        key
      ] = `https://cdn.sanity.io/files/${process.env.SANITY_ID}/${process.env.ENVIRONMENT}/${refId}.${refExtension}`
    }
    return acc
  }, {})
}
