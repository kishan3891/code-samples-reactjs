import React from 'react'
import PageComponent from 'components/Page'
import { makeStyles } from '@material-ui/core/styles'
import BoatConfiguratorThanks from 'components/BoatConfigurator/thankyou'

export const useStyles = makeStyles(theme => ({
    
}))

const BoatConfiguratorThankYou = () => {
    const classes = useStyles()
    return (
        <PageComponent>
            <BoatConfiguratorThanks></BoatConfiguratorThanks>
        </PageComponent>
    )
}

BoatConfiguratorThankYou.getInitialProps = async ({ query }) => {
  return { properties: { shade: 'dark' } }
}

BoatConfiguratorThankYou.propTypes = {}

export default BoatConfiguratorThankYou