import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import {
  TextField,
  Button,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Link,
  FormControl,
  Checkbox,
} from 'components'
import useTranslations from 'src/i18n'
import MailchimpSubscribe from 'react-mailchimp-subscribe'

export const useStyles = makeStyles(theme => ({
  root: {},
  field: {
    margin: theme.spacing(0.5, 0),
  },
  link: {
    textDecoration: 'underline',
  }
}))

const NewsletterForm = props => {
  const { showContactType, mailchimpUrl, successMessage, className } = props
  const classes = useStyles()
  const translations = useTranslations()
  const { register, handleSubmit, errors, formState } = useForm({ mode: 'onChange' })
  const [contactType, setContactType] = React.useState('newsletter')

  const onChangeContactType = event => setContactType(event.target.value)

  return (
    <MailchimpSubscribe
      url={mailchimpUrl}
      render={({ subscribe, status, message }) => {
        const onSubmit = data => {
          subscribe({
            EMAIL: data.email,
            NAME: data.name,
            PHONE: data.phone,
            TYPE: data.contactType,
          })
        }

        return status === 'success' ? (
          <Box p={8} className={className}>
            <Typography>{successMessage || message}</Typography>
          </Box>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className={classnames(classes.root, className)}>
            <TextField
              className={classes.field}
              name="email"
              type="email"
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
              name="name"
              inputRef={register({ required: true })}
              label={translations`common.form.name`}
              error={!!errors.name}
              helperText={errors.name && 'Name is required'}
              fullWidth
            />
            <TextField
              className={classes.field}
              inputRef={register({ pattern: /^([0-9]|\+| |-)+$/i })}
              type="tel"
              name="phone"
              defaultValue="+46"
              label={translations`common.form.phone`}
              error={!!errors.phone}
              helperText={errors.phone && 'Invalid phone number'}
              fullWidth
            />
            <FormControlLabel
              value="termsAndConditions"
              label={
                <Typography>
                  {translations`newsletterForm.termsAndConditions`}{' '}
                  <Link
                    href={translations`newsletterForm.termsAndConditionsHref`}
                    className={classes.link}
                  >{translations`newsletterForm.termsAndConditionsLink`}</Link>{' '}
                </Typography>
              }
              control={
                <Checkbox name="termsAndConditions" inputRef={register({ required: true })} />
              }
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
  )
}


NewsletterForm.propTypes = {
  showContactType: PropTypes.bool,
  className: PropTypes.string,
  mailchimpUrl: PropTypes.string.isRequired,
  successMessage: PropTypes.string,
}

export default NewsletterForm
