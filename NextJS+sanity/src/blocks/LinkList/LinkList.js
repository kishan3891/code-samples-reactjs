import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Section, Container, Box, Typography, SectionHeadline, ButtonBase } from 'components'
import RouterLink from 'containers/RouterLink'
import routeMatch from 'utils/routeMatch'
import * as icons from 'components/icons'

export const useStyles = makeStyles(theme => ({
  root: {},
  content: {},
  icon: {
    width: 50,
    height: 50,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      width: '100%',
      height: '100%',
    },
  },
  link: {
    display: 'block',
    width: '100%',
    padding: theme.spacing(2, 0),
    '&:not(:first-child)': {
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  },
}))

const LinkList = props => {
  const { links, headline } = props
  const classes = useStyles()

  const ArrowForwardIcon = icons.ArrowForwardIcon

  return (
    <Section className={classes.root}>
      <SectionHeadline>{headline}</SectionHeadline>
      <Container maxWidth="lg" className={classes.content}>
        <Box>
          {links.map(linkItem => {
            const Icon = icons[linkItem.icon]
            return (
              <ButtonBase
                component={RouterLink}
                underline="none"
                href={routeMatch(linkItem.link.href)}
                as={linkItem.link.href}
                key={linkItem.key}
                className={classes.link}
              >
                <Box display="flex" alignItems="center">
                  <Box mr={2} className={classes.icon}>
                    <Icon />
                  </Box>
                  <Typography variant="h5">{linkItem.link.label}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box pt={2} clone>
                    <Typography>{linkItem.description}</Typography>
                  </Box>
                  <Box ml={2}>
                    <ArrowForwardIcon />
                  </Box>
                </Box>
              </ButtonBase>
            )
          })}
        </Box>
      </Container>
    </Section>
  )
}

LinkList.propTypes = {
  headline: PropTypes.string,
  links: PropTypes.array.isRequired,
}

export default LinkList
