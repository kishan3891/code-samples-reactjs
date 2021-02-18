import React from 'react'
import PageComponent from 'components/Page'
import Header from 'components/BoatConfigurator/Header'
import { ProxyContextProvider } from '../../context/proxy-context'

import Exterior from 'components/BoatConfigurator/Exterior'
import Interior from 'components/BoatConfigurator/Interior'
import Technology from 'components/BoatConfigurator/Technology'
import AddOns from 'components/BoatConfigurator/AddOns'
import Summary from 'components/BoatConfigurator/Summary'

import ExteriorMob from 'components/BoatConfigurator/Exterior/mobile'
import InteriorMob from 'components/BoatConfigurator/Interior/mobile'
import TechnologyMob from 'components/BoatConfigurator/Technology/mobile'
import AddOnsMob from 'components/BoatConfigurator/AddOns/mobile'

import Footer from 'components/BoatConfigurator/Footer'
import { Tab } from 'react-bootstrap';

import { makeStyles } from '@material-ui/core/styles'
// import withStyles from '@material-ui/core/styles/withStyles'

export const useStyles = makeStyles(theme => ({
    customTab: {
        '@media (max-width: 767px)': {
            display: 'none',
        }
    },
    mobLayout: {
        '@media (min-width: 768px)': {
            display: 'none',
        }
    }
}))

const BoatConfigurator = props => {
    const classes = useStyles()
    return (
        <PageComponent>
            <ProxyContextProvider>
            <Tab.Container id="services-tabs" defaultActiveKey="1">
                <Header></Header>
                <Tab.Content className={classes.customTab}>
                    <Tab.Pane eventKey="1">
                        <Exterior></Exterior>
                    </Tab.Pane>
                    <Tab.Pane eventKey="2">
                        <Interior></Interior>
                    </Tab.Pane>
                    <Tab.Pane eventKey="3">
                        <Technology></Technology>
                    </Tab.Pane>
                    <Tab.Pane eventKey="4">
                        <AddOns></AddOns>
                    </Tab.Pane>
                    <Tab.Pane eventKey="5">
                        <Summary></Summary>
                    </Tab.Pane>
                </Tab.Content>
                <div className={classes.mobLayout}>
                    <ExteriorMob></ExteriorMob>
                    <InteriorMob></InteriorMob>
                    <TechnologyMob></TechnologyMob>
                    <AddOnsMob></AddOnsMob>
                </div>
                <Footer></Footer>
            </Tab.Container>
            </ProxyContextProvider>
        </PageComponent>
    )
}

BoatConfigurator.getInitialProps = async ({ query }) => {
  return { properties: { shade: 'dark' } }
}

BoatConfigurator.propTypes = {}

export default BoatConfigurator