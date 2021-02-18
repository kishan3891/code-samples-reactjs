import PropTypes from 'prop-types'

const link = PropTypes.shape({
  label: PropTypes.string,
  href: PropTypes.string,
})

const cta = PropTypes.shape({
  icon: PropTypes.function, // icon component to render
  link,
})

const breakpoints = PropTypes.shape({
  xs: PropTypes.any.isRequired,
  sm: PropTypes.any,
  md: PropTypes.any,
  lg: PropTypes.any,
  xl: PropTypes.any,
})

const media = PropTypes.shape({
  breakpoints,
  responsive: PropTypes.bool,
})

const navigation = PropTypes.shape({
  mobile: PropTypes.shape({
    primaryItems: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        link: link.isRequired,
      }),
    ),
    secondaryLinks: PropTypes.arrayOf(link.isRequired).isRequired,
    tertiaryLinks: PropTypes.arrayOf(link.isRequired).isRequired,
  }),
  desktop: PropTypes.shape({
    primaryItems: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        link: link.isRequired,
      }),
    ),
    secondaryLinks: PropTypes.arrayOf(link.isRequired).isRequired,
    tertiaryLinks: PropTypes.arrayOf(link.isRequired).isRequired,
  }),
})

const footer = PropTypes.shape({
  socialLinks: PropTypes.arrayOf(cta),
  footerLinks: PropTypes.arrayOf(link),
})

export default {
  link,
  cta,
  media,
  navigation,
  footer,
}
