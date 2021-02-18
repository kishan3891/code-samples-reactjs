import React from 'react'
import PropTypes from 'prop-types'
import { Section, Container, List, ListItem, Typography, Divider, Box } from 'components'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  root: {},
  listItem: {
    display: 'block',
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}))

const ListBlock = props => {
  const { items } = props
  const classes = useStyles()

  return (
    <Section className={classes.root}>
      <Container>
        <List disablePadding>
          {items.map(item => (
            <ListItem disableGutters className={classes.listItem} key={item.key}>
              <Box display="flex" justifyContent="space-between" width="100%">
                <Typography variant="h5">{item.title}</Typography>
                <Typography variant="h5">
                  <b>{item.value}</b>
                </Typography>
              </Box>
              <Divider className={classes.divider} />
              <Typography variant="body1">{item.description}</Typography>
            </ListItem>
          ))}
        </List>
      </Container>
    </Section>
  )
}

ListBlock.propTypes = {
  items: PropTypes.array.isRequired,
}

export default ListBlock
