import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Section,
  Container,
  Box,
  List,
  ListItem,
  Typography,
  MediaLoader,
  Media,
  Button,
  Hidden,
} from 'components'
import RouterLink from 'containers/RouterLink'
import routeMatch from 'utils/routeMatch'
import useTranslations from 'src/i18n'

export const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    color: theme.palette.text.primary,
  },
  productInner: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row-reverse',
    },
  },
  product: {
    '&:not(:first-child)': {
      paddingTop: theme.spacing(6),
    },
  },
  productMediaContainer: {
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2),
    },
  },
}))

const ProductList = props => {
  const { products } = props
  const classes = useStyles()
  const translations = useTranslations()

  return (
    <Section className={classes.root}>
      <Container maxWidth="lg" className={classes.content}>
        {products.map(product => {
          const priceFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
          })
          const price = priceFormatter.format(product.price)
          return (
            <Box textAlign="center" className={classes.product} key={product.slug}>
              <Hidden mdUp implementation="css">
                <Typography variant="h6">{product.title}</Typography>
              </Hidden>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                className={classes.productInner}
              >
                <Box flexBasis="50%" maxWidth={464}>
                  <Hidden smDown implementation="css">
                    <Typography variant="h6">{product.title}</Typography>
                  </Hidden>
                  <List disablePadding>
                    {product.specs.slice(0, 3).map(spec => (
                      <ListItem divider disableGutters key={spec.key}>
                        <Box display="flex" width="100%" justifyContent="space-between">
                          <Typography variant="caption" color="textSecondary">
                            {spec.name}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {spec.value}
                          </Typography>
                        </Box>
                      </ListItem>
                    ))}
                    {product.price && (
                      <ListItem disableGutters>
                        <Box display="flex" width="100%" justifyContent="space-between">
                          <Typography variant="caption">
                            <b>Price</b>
                          </Typography>
                          <Typography variant="caption">
                            <strong>{`${price}`}</strong>
                          </Typography>
                        </Box>
                      </ListItem>
                    )}
                  </List>
                  <Hidden smDown implementation="css">
                    <Box py={2}>
                      <Button
                        component={RouterLink}
                        href={routeMatch(product.slug)}
                        as={product.slug}
                        variant="outlined"
                        color="primary"
                        size="large"
                        fullWidth
                      >
                        {product.available
                          ? translations`productList.cta`
                          : translations`productList.ctaUnavailable`}
                      </Button>
                    </Box>
                  </Hidden>
                </Box>
                <Box flexBasis="50%" flexGrow={1} className={classes.productMediaContainer}>
                  <MediaLoader width={1.78} height={1} lazy>
                    <Media {...product.variants?.[0].images[0]} component="img" />
                  </MediaLoader>
                </Box>
              </Box>
              <Hidden mdUp implementation="css">
                <Box py={2}>
                  <Button
                    component={RouterLink}
                    href={routeMatch(product.slug)}
                    as={product.slug}
                    variant="outlined"
                    color="primary"
                    fullWidth
                  >
                    {product.available
                      ? translations`productList.cta`
                      : translations`productList.ctaUnavailable`}
                  </Button>
                </Box>
              </Hidden>
            </Box>
          )
        })}
      </Container>
    </Section>
  )
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
}

export default ProductList
