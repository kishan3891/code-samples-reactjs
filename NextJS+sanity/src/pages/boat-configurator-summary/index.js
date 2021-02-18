import React from 'react'
import PageComponent from 'components/Page'
import Header from 'components/BoatConfigurator/Header'
import SummaryMob from 'components/BoatConfigurator/Summary/mobile'
import Footer from 'components/BoatConfigurator/Footer'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
    
}))

const BoatConfiguratorSummaryMob = () => {
    const classes = useStyles()
    return (
        <PageComponent>
            <Header></Header>
                <SummaryMob></SummaryMob>
            <Footer></Footer>
        </PageComponent>
    )
}

BoatConfiguratorSummaryMob.getInitialProps = async ({ query }) => {
  return { properties: { shade: 'dark' } }
}

BoatConfiguratorSummaryMob.propTypes = {}

export default BoatConfiguratorSummaryMob