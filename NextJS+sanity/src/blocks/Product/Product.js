import React from 'react'
import PropTypes from 'prop-types'
import propTypes from 'api/propTypes'
import {
  Section,
  Container,
  Typography,
  Media,
  MediaLoader,
  Box,
  Button,
  Slideshow,
  SlideshowSlides,
  SlideshowSlide,
  RadioGroup,
  FormControlLabel,
  Swatch,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Drawer,
  Hidden,
} from 'components'
import RouterLink from 'containers/RouterLink'
import { makeStyles } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import useTranslations from 'src/i18n'
import { CheckmarkIcon, ExpandMoreIcon } from 'components/icons'

const DESKTOP_DRAWER_WIDTH = 504

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

export const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    width: '100%',
  },
  header: {
    padding: `${theme.spacing(10)}px 0`,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      minHeight: 462,
    },
  },
  background: {
    ...theme.mixins.absoluteCover(),
    zIndex: -1,
  },
  backgroundMedia: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  foreground: {
    zIndex: 10,
    textAlign: 'center',
    padding: `${theme.spacing(3.9)}px 0`,
  },
  contentWrapper: {
    marginTop: -100,
    [theme.breakpoints.up('lg')]: {
      marginTop: '-15%',
      width: 'calc(100% - var(--product-drawer-width))',
    },
  },
  content: {},
  slideshow: {
    overflow: 'visible',
    maxWidth: theme.breakpoints.values.md,
  },
  slide: {
    marginRight: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      marginRight: 200,
    },
  },
  colorSwatchGroup: {
    flexDirection: 'row',
  },
  includedList: {
    width: '100%',
  },
  listItemIcon: {
    color: theme.palette.text.secondary,
  },
  priceContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  price: {
    textAlign: 'center',
  },
  oldPrice: {
    textDecoration: 'line-through',
    textAlign: 'center',
    marginRight: theme.spacing(2),
  },
  desktopDrawerPaper: {
    padding: theme.spacing(4),
    width: DESKTOP_DRAWER_WIDTH,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureValue: {
    [theme.breakpoints.up('md')]: {
      ...theme.typography.h3,
    },
  },
}))

const ProductBlock = props => {
  const { backgroundMedia, product, orderUrl, onChangeVariant, variant } = props
  const classes = useStyles()
  const translations = useTranslations()
  const productVariant = product.variants.find(currentVariant => currentVariant.name === variant)
  const lgUp = useMediaQuery(theme => theme.breakpoints.up('lg'))
  const [slideshowInit, setSlideshowInit] = React.useState(false)

  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  })

  useEnhancedEffect(() => {
    document.documentElement.style.setProperty(
      `--product-drawer-width`,
      `${lgUp ? DESKTOP_DRAWER_WIDTH : 0}px`,
    )
    setSlideshowInit(true)
    return () => {
      document.documentElement.style.setProperty(`--product-drawer-width`, '0px')
    }
  }, [lgUp])

  const headline = (
    <Typography component="h1" variant="h3">
      {product.title}
    </Typography>
  )

  const swatches = (
    <Box display="flex" justifyContent="center">
      <RadioGroup
        aria-label="color"
        name="variant"
        className={classes.colorSwatchGroup}
        onChange={onChangeVariant}
      >
        {product.variants.map(currentVariant => (
          <Box p={1} key={currentVariant.name} textAlign="center">
            <FormControlLabel
              value={currentVariant.name}
              control={<Swatch color={currentVariant.color} />}
              label={
                <Typography
                  variant="caption"
                  color={currentVariant.name === variant ? 'textPrimary' : 'textSecondary'}
                >
                  {currentVariant.name}
                </Typography>
              }
              labelPlacement="bottom"
            />
          </Box>
        ))}
      </RadioGroup>
    </Box>
  )

  const buyButton = product.available && orderUrl && (
    <Box mt={2}>
      <Button
        component={RouterLink}
        variant="contained"
        size="large"
        fullWidth
        href={`${orderUrl}?c=${variant}`}
      >
        {translations`product.buy`}
      </Button>
    </Box>
  )

  const phoneLink = product.available && (
    <Box textAlign="center" mt={2}>
      <Link
        href={`tel:${translations`product.phone`}`}
        variant="caption"
        color="textSecondary"
        underline="always"
      >{translations`product.help`}</Link>
    </Box>
  )
  const features = (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      {product.features.map(feature => (
        <Box key={feature} display="flex" p={1} color="text.secondary">
          <Box mr={1} clone>
            <CheckmarkIcon />
          </Box>
          <Typography>{feature}</Typography>
        </Box>
      ))}
    </Box>
  )

  return (
    <Section disableSpacing disablePadding className={classes.root}>
      <Container component="header" maxWidth={false} className={classes.header}>
        <MediaLoader className={classes.background}>
          <Media {...backgroundMedia} className={classes.backgroundMedia} />
        </MediaLoader>
        <Container maxWidth="sm" className={classes.foreground}>
          <Hidden lgUp implementation="css">
            {headline}
          </Hidden>
        </Container>
      </Container>
      <Box className={classes.contentWrapper}>
        <Container className={classes.content}>
          <Slideshow init={slideshowInit} slidesPerView="auto" className={classes.slideshow}>
            <SlideshowSlides>
              {productVariant.images.map(media => (
                <SlideshowSlide className={classes.slide} key={media.key}>
                  <MediaLoader width={1.77} height={1}>
                    <Media className={classes.featuredImage} {...media} />
                  </MediaLoader>
                </SlideshowSlide>
              ))}
            </SlideshowSlides>
          </Slideshow>
          <Hidden lgUp implementation="css">
            {swatches}
            <Divider />
          </Hidden>
          <Box py={2} display="flex" justifyContent="center">
            {product.keyFeatures.slice(0, 3).map(feature => (
              <Box px={2} textAlign="center" flexBasis={'33%'} key={feature.key}>
                <Typography variant="overline" color="textSecondary">
                  {feature.name}
                </Typography>
                <Typography variant="h4" className={classes.featureValue}>
                  {feature.value}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {feature.unit}
                </Typography>
              </Box>
            ))}
          </Box>
          <Hidden lgUp implementation="css">
            <div className={classes.priceContainer}>
              {product.oldPrice && (
                <Typography className={classes.oldPrice} variant="h6">
                  {priceFormatter.format(product.oldPrice)}
                </Typography>
              )}
              <Typography className={classes.price} variant="h6">
                {priceFormatter.format(product.price)}
              </Typography>
            </div>
            {buyButton}
            {phoneLink}
            {features}
          </Hidden>
          <Box py={3} textAlign="center" color="text.secondary">
            <Typography>{product.description}</Typography>
          </Box>
          <Box py={2}>
            <Typography variant="subtitle1">
              <b>{translations`product.techSpecs`}</b>
            </Typography>
            <List disablePadding>
              {product.specs.map(spec => (
                <ListItem divider disableGutters key={spec.key}>
                  <Box display="flex" justifyContent="space-between" width="100%">
                    <Typography color="textSecondary">{spec.name}</Typography>
                    <Typography color="textSecondary">{spec.value}</Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box py={2}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  <b>{translations`product.included`}</b>
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List disablePadding className={classes.includedList}>
                  {product.included.map(item => (
                    <ListItem disableGutters divider key={item}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                        color="text.secondary"
                      >
                        <Box mr={1} clone>
                          <CheckmarkIcon />
                        </Box>
                        <ListItemText primary={item} />
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            {product.attachment?.href && (
              /* eslint-disable react/prop-types */
              <Box mt={2}>
                <Button
                  component={RouterLink}
                  href={product.attachment.href}
                  target="_blank"
                  download
                  variant="outlined"
                  color="primary"
                  fullWidth
                >
                  {product.attachment.label}
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      {/* Desktop drawer */}
      <Hidden mdDown>
        <Drawer
          variant="permanent"
          anchor="right"
          open
          classes={{ paper: classes.desktopDrawerPaper }}
        >
          <Box width="100%" textAlign="center">
            {headline}
            {swatches}
            <div className={classes.priceContainer}>
              {product.oldPrice && (
                <Typography className={classes.oldPrice} variant="h6">
                  {priceFormatter.format(product.oldPrice)}
                </Typography>
              )}
              <Typography className={classes.price} variant="h6">
                {priceFormatter.format(product.price)}
              </Typography>
            </div>
            {buyButton}
            {phoneLink}
            {features}
          </Box>
        </Drawer>
      </Hidden>
    </Section>
  )
}

ProductBlock.propTypes = {
  backgroundMedia: propTypes.media,
  onChangeVariant: PropTypes.func.isRequired,
  onAddProductToCart: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
  product: PropTypes.shape({
    available: PropTypes.bool,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number,
    oldPrice: PropTypes.number,
    variants: PropTypes.array.isRequired,
    keyFeatures: PropTypes.array.isRequired,
    features: PropTypes.array,
    description: PropTypes.string,
    specs: PropTypes.array.isRequired,
    included: PropTypes.array.isRequired,
    attachment: propTypes.link,
  }).isRequired,
  orderUrl: PropTypes.string,
}

export default ProductBlock
