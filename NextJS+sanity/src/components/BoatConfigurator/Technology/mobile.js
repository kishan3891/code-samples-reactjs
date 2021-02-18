import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useCookies } from 'react-cookie';
import configuratorHelper from '../configurator-helper'
import { useRouter } from 'next/router'

export const useStyles = makeStyles(theme => ({
    root: {
        '& [class*="show-more-height"]': { 
            height: '130px', 
            overflow: 'hidden', 
        },
    },
    container: {
        maxWidth: '1440px',
        padding: '0 15px',
        width: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    productRight: {
        paddingTop: '40px',
        '& h4': {
            marginBottom: '19px',
            textAlign: 'center',
        },
        '& p': {
            textAlign: 'center',
        },
    },
    productLeft: {
        paddingTop: '34px',
    },
    interiorLayoutInner: {
        '& label span': {
            float: 'right',
        },
    },
    technologyBtm: {
        marginTop: '35px',
        '& input[type="checkbox"]': {
            display: 'none',
            '& + label': {
                border: '1px solid #fff',
                borderRadius: '10px',
                padding: '0 30px',
                display: 'block',
                fontSize: '12px',
                color: '#fff',
                height: '58px',
                lineHeight: '58px',
                position: 'relative',
                paddingLeft: '60px',
                '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    transition: 'all .12s, border-color .08s',
                    width: '24px',
                    height: '24px',
                    border: '2px solid #fff',
                    borderRadius: '3px',
                    opacity: '1',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    left: '25px',
                },
                '&:after': {
                    border: '2px solid #fff',
                    borderTopColor: 'transparent',
                    borderLeftColor: 'transparent',
                    content: '""',
                    position: 'absolute',
                    transform: 'rotate(45deg)',
                    top: '18px',
                    left: '34px',
                    width: '7px',
                    height: '15px',
                    opacity: '0',
                },
            },
            '&:checked': {
                '& + label': {
                    fontWeight: '700',
                    '&:before': {
                        width: '24px',
                        height: '24px',
                        border: '2px solid #fff',
                        borderRadius: '3px',
                        opacity: '1',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        left: '25px',
                    },
                    '&:after': {
                        opacity: '1',
                    }
                },
            },
        },
    },
    rightBtm: {
        paddingTop: '40px',
        '& button': {
            cursor: 'pointer',
            fontSize: '12px',
            textDecoration: 'underline',
            border: 'none',
            background: 'none',
            color: '#fff',
            fontSize: '500',
            marginTop: '10px',
            '&:focus': {
                outline: 'none',
            }
        },
        '& h5': {
            marginBottom: '8px',
            fontWeight: '700',
        },
        '& ul': {
            paddingLeft: '30px',
            '& li': {
                listStyle: 'disc',
                letterSpacing: '-0.01em',
            },
        },
    },
}))

export const BoatConfiguratorTechnology = props => {
    const classes = useStyles()
    const [cookies, setCookie] = useCookies(['captainsWatch']);
    const router = useRouter()

    function handleOnTechnologyChange(el) {
        if(el.target.checked) {
            setCookie(el.target.value, '2500', { path: '/' });
            configuratorHelper.addParamToUrl('t', 't')
        }
        else {
            setCookie(el.target.value, '0', { path: '/' });
            configuratorHelper.removeParamFromUrl('t')
        }
    }

    return (
        <div id="mobile-technology" className={classes.root}>
            <div className={classes.productLeft}>
                <figure>
                    <img src={`images/technology-img.png`} className={classes.fixImg} />
                </figure>
            </div>
            <div className={classes.container}>
                <div className={classes.productRight}>
                    <h4>Captains Smart Watch</h4>
                    <p>X Shore develops its own software on the Garmin platform. The watch is a Garmin MARQ Smart Watch with X Shore own software installed</p>
                    <div className={classes.rightBtm}>
                        <h5>All Boats includes</h5>
                        <ul className="tech-list show-more-height text">
                            <li>Unlock/lock your boat</li>
                            <li>Man Over Board feature that if you would fall in the boat automatically stops</li>
                            <li>Send texts, share your position, and trigger SOS notifications, even o!shore</li>
                            <li>Garmin 24-inch, waterproof and anti-glare touchscreen</li>
                            <li>Garmin marine & satellite maps for your area</li>
                            <li>3 step foldable swim ladder in the stern</li>
                            <li>Lanterns</li>
                            <li>Over-The-Air software updates</li>
                            <li>Standard stereo audio-system</li>
                            <li>Smart charging-cable</li>
                            <li>Garmin 24-inch, waterproof and anti-glare touchscreen</li>
                            <li>Garmin marine & satellite maps for your area</li>
                            <li>3 step foldable swim ladder in the stern</li>
                            <li>Lanterns</li>
                            <li>Over-The-Air software updates</li>
                            <li>Standard stereo audio-system</li>
                            <li>Smart charging-cable</li>
                        </ul>
                        <button id="load-more" className="show-more">Show Details</button>
                    </div>
                    <div className={classes.technologyBtm}>
                        <div className={classes.interiorLayoutInner}>
                            <div className="select-box">
                                <input type="checkbox" onClick={handleOnTechnologyChange} id="captainsWatchMob" name="captainsWatchMob" value="captainsWatch" defaultChecked={router.query?.t} />
                                <label htmlFor="captainsWatchMob">Select Captains Watch <span>2,500 €</span></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoatConfiguratorTechnology;
