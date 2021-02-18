import React from 'react'
import PropTypes from 'prop-types'
import PageComponent from 'components/Page'
import sanity from 'src/api/sanity'
import groq from 'api/sanity/groq'
import { useAppContext } from 'containers/App/AppContext'
import { transformMedia } from 'utils/sanity'
import {
  Section,
  Container,
  Typography,
  Slideshow,
  SlideshowSlides,
  SlideshowSlide,
  MediaLoader,
  Media,
  Box,
  TextField,
  Button,
} from 'components'
import { useForm } from 'react-hook-form'
import useTranslations from 'src/i18n'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  content: {
    zIndex: 10,
    textAlign: 'center',
    padding: `${theme.spacing(10)}px 0`,
    ...theme.mixins.gutters(),
  },
  field: {
    margin: theme.spacing(0.5, 0),
  },
  splitField: {
    '&:not(:first-child)': {
      marginLeft: theme.spacing(1),
    },
  },
}))

const CheckoutPage = () => {
  const classes = useStyles()
  const appContext = useAppContext()
  const translations = useTranslations()
  const [product, setProduct] = React.useState(null)
  const productVariant =
    product &&
    product.variants.find(currentVariant => currentVariant.name === appContext.cartProduct.variant)
  const { register, handleSubmit, errors, formState } = useForm({ mode: 'onChange' })

  // fetch product client-side
  React.useEffect(() => {
    sanity.fetch(groq.getProduct(appContext.cartProduct.product)).then(result => {
      setProduct({
        ...result,
        variants: result.variants.map(variant => ({
          ...variant,
          images: variant.images.map(image => transformMedia(image)),
        })),
      })
    })
  }, [appContext.cartProduct])

  return (
    <PageComponent>
      <Section>
        <Container maxWidth="md" className={classes.content}>
          <Typography component="h1" variant="h3">
            Finalize Order
          </Typography>
          {productVariant && (
            <Slideshow className={classes.slideshow}>
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
          )}
          <Typography variant="h6">Order information</Typography>
          <Container maxWidth="sm">
            <MailchimpSubscribe
              url="https://xshore.us17.list-manage.com/subscribe/post?u=dd0717a7364c19e3effea7b2e&amp;id=52952a05e3"
              render={({ subscribe, status, message }) => {
                const onSubmit = data => {
                  subscribe({
                    EMAIL: data.email,
                    FIRSTNAME: data.firstName,
                    LASTNAME: data.lastName,
                    PHONE: data.phone,
                    COUNTRY: data.country,
                  })
                }

                return status === 'success' ? (
                  <Box p={8}>
                    <Typography>{message}</Typography>
                  </Box>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
                    <Box display="flex">
                      <TextField
                        className={classes.splitField}
                        name="firstName"
                        inputRef={register({ required: true })}
                        label={translations`common.form.firstName`}
                        error={!!errors.firstName}
                        helperText={errors.firstName && 'First name is required'}
                        fullWidth
                      />
                      <TextField
                        className={classes.splitField}
                        name="lastName"
                        inputRef={register({ required: true })}
                        label={translations`common.form.lastName`}
                        error={!!errors.lastName}
                        helperText={errors.lastName && 'Last name is required'}
                        fullWidth
                      />
                    </Box>
                    <TextField
                      className={classes.field}
                      name="email"
                      inputRef={register({
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      })}
                      label={translations`common.form.email`}
                      error={!!errors.email}
                      helperText={errors.email && 'Email is required'}
                      fullWidth
                    />
                    <TextField
                      className={classes.field}
                      inputRef={register({ required: true, pattern: /^([0-9]|\+| |-)+$/i })}
                      type="tel"
                      name="phone"
                      defaultValue="+46"
                      label={translations`common.form.phone`}
                      error={!!errors.phone}
                      helperText={errors.phone && 'Invalid phone number'}
                      fullWidth
                    />
                    <TextField
                      className={classes.field}
                      inputRef={register({ required: true })}
                      name="country"
                      label={translations`common.form.country`}
                      error={!!errors.country}
                      helperText={errors.country && 'Country is required'}
                      fullWidth
                    />
                    {status === 'error' && (
                      <Typography color="error" dangerouslySetInnerHTML={{ __html: message }} />
                    )}
                    <Box mt={2} clone>
                      <Button
                        disabled={!formState.isValid || !formState.dirty}
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                      >
                        Send
                      </Button>
                    </Box>
                  </form>
                )
              }}
            />
          </Container>
        </Container>
      </Section>
    </PageComponent>
  )
}

CheckoutPage.getInitialProps = async ({ query }) => {
  return { properties: { shade: 'dark' } }
}

CheckoutPage.propTypes = {}

export default CheckoutPage
