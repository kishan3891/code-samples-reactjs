import React from 'react'
import { Nav } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/style.css'

export const styles = makeStyles(theme => ({
    root: {
        
    },
    container: {
        maxWidth: '1440px',
        padding: '0',
        width: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    logo: {
        display: 'inline-block',
        marginRight: '63px',
        position: 'relative',
        top: '19px',
        '@media (max-width: 767px)': {
            marginRight: '0',
            maxWidth: '88px',
            top: '0',
        }
    },
    headInner: {
        marginRight: '63px',
        borderBottom: '1px solid #FFFFFF',
        paddingLeft: '59px',
        '@media (max-width: 767px)': {
            marginRight: '0',
            paddingLeft: '0',
            textAlign: 'center',
        }
    },
    topNav: {
        display: 'inline-block',
        verticalAlign: 'bottom',
        position: 'relative',
        top: '-24px',
        '& > div > div': {
            display: 'inline-block',
            marginRight: '26px',
            '&:last-child': {
                marginRight: '0',
            },
            '& a': {
                color: '#fff',
                fontSize: '22px',
                lineHeight: '21px',
                position: 'relative',
                padding: '0 35px',
                '&:after': {
                    position: 'absolute',
                    content: '""',
                    width: '168px',
                    height: '4px',
                    bottom: '-24px',
                    left: '50%',
                    background: '#E1D6C6',
                    transition: 'transform 0.5s',
                    transform: 'scaleX(0) translateX(-50%)',
                    transformOrigin: 'right',
                },
                '&[class*="active"]:after, &:hover:after': {
                    transform: 'scaleX(1) translateX(-50%)',
                    transformOrigin: 'left',
                },
            },
            '@media (max-width: 1366px)': {
                marginRight: '24px',
                '& a': {
                    padding: '0 20px',
                    '&:after': {
                        width: '140px',
                    },
                },    
            },
        },
        '@media (max-width: 767px)': {
            display: 'none',
        }
    }
}))

export const BoatConfiguratorHeader = props => {
    const classes = styles()
    return (
        <header className={classes.root}>
            <div className={classes.container}>
                <div className={classes.headInner}>
                    <div className={classes.logo}>
                        <a href="/"><img src={`images/logo.svg`} /></a>
                    </div>
                    <div className={classes.topNav}>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link eventKey="1">1. Exterior</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="2">2. Interior</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="3">3. Technology</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="4">4. Add ons</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="5">5. Summary</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

BoatConfiguratorHeader.getInitialProps = async ({ query }) => {
    return { properties: { shade: 'dark' } }
}

BoatConfiguratorHeader.propTypes = {}

export default withStyles(styles)(BoatConfiguratorHeader)