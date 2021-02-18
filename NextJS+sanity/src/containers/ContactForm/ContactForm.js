import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useForm } from 'react-hook-form'
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Link,
  Checkbox,
  FormHelperText,
} from 'components'
import useTranslations from 'src/i18n'
import MailchimpSubscribe from 'react-mailchimp-subscribe'

const MAX_MESSAGE_LENGTH = 255

export const useStyles = makeStyles(theme => ({
  root: {},
  field: {
    margin: theme.spacing(0.5, 0),
  },
  link: {
    textDecoration: 'underline',
  },
  inputCol: {
    marginBottom: '16px',
    '& input, textarea': {
      background: 'none',
      position: 'relative',
      padding: '8px',
      width: '100%',
      border: '1px solid #4a4a4a',
      background: 'none',
      borderRadius: '0px',
      backgroundColor: 'none',
      fontSize: '20px',
      color: '#fff',
    },
    '& label': {
      position: 'absolute',
      left: '33px',
      marginTop: '8px',
      fontSize: '14px',
    },
  },
  button: {
    backgroundColor: '#eee',
    border: 'none',
    display: 'inline-block',
    cursor: 'pointer',
    color: '#111',
    fontSize: '15px',
    width: '100%',
    fontWeight: 'bold',
    letterSpacing: '2px',
    padding: '12px',
    textTransform: 'uppercase',
    marginBottom: '10px',
  },
  inputCheckbox: {
    marginBottom: '10px',
    '& input': {
      marginRight: 10,
    },
    '& label': {
      fontSize: '15px',
    },
    '& a': {
      textDecoration: 'underline',
    },
  },
}))

const ContactForm = () => {
  const classes = useStyles()
  const translations = useTranslations()
  const { register, handleSubmit, errors, formState } = useForm({ mode: 'onChange' })
  const defaultValue = {
    email: '',
    name: '',
    message: '',
    termsAndConditions: '',
  }
  const [formValue, setFormValue] = React.useState(defaultValue)
  const [messageCharsLeft, setMessageCharsLeft] = React.useState(255)
  const handleChange = e => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }
  return (
    <MailchimpSubscribe
      url="https://xshore.us17.list-manage.com/subscribe/post?u=dd0717a7364c19e3effea7b2e&amp;id=bfe8b0125e"
      render={({ subscribe, status, message }) => {
        const onSubmit = e => {
          //e.preventDefault();
          subscribe({
            EMAIL: formValue.email,
            NAME: formValue.name,
            MESSAGE: formValue.message,
          })
        }

        return status ? (
          <Box p={8}>
            <Typography>
              Thank you for contacting us. We will get back to you as soon as possible.
            </Typography>
          </Box>
        ) : (
          <form
            onSubmit={onSubmit}
            name="mail-form"
            method="POST"
            data-netlify="true"
            className={classes.root}
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className={classes.inputCol}>
              <input
                type="email"
                placeholder={translations`common.form.email`}
                name="email"
                value={formValue.email}
                required
                onChange={handleChange}
                className={classes.input}
              />
            </div>
            <div className={classes.inputCol}>
              <input
                type="text"
                placeholder={translations`common.form.name`}
                value={formValue.name}
                onChange={handleChange}
                name="name"
                required
                className={classes.input}
              />
            </div>

            <div className={classes.inputCol}>
              <textarea
                name="message"
                placeholder={translations`common.form.message`}
                onChange={handleChange}
                value={formValue.message}
                rows="4"
                required
                className={classes.input}
              ></textarea>
            </div>
            <div className={classes.inputCheckbox}>
              <label>
                <input
                  name="termsAndConditions"
                  required
                  type="checkbox"
                  value={formValue.termsAndConditions}
                />
                I have read and accepted the <a href="/terms-and-conditions">terms & conditions</a>
              </label>
            </div>
            <div>
              <button id="contactButton" type="submit" className={classes.button}>
                Send
              </button>
            </div>
            {/* {status === 'error' && (
              <Typography color="error" dangerouslySetInnerHTML={{ __html: message }} />
            )} */}
          </form>
        )
      }}
    />
  )
}

ContactForm.propTypes = {}

export default ContactForm
