import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useCookies } from 'react-cookie';
import configuratorHelper from '../configurator-helper'
import { useRouter } from 'next/router'

export const useStyles = makeStyles(theme => ({
    root: {
        '& [class*="show-more-height"]': { 
            height: '140px', 
            overflow: 'hidden', 
        },
    },
    container: {
        maxWidth: '1440px',
        padding: '0',
        width: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    productRight: {
        paddingTop: '43px',
        height: '85vh',
        paddingBottom: '80px',
        overflowY: 'auto',
        paddingRight: '63px',
        '& [id="load-more"]': {
            marginTop: '12px',
        },
        '& h4': {
            marginBottom: '22px',
        },
        '& p': {
            color: '#fff',
        },
        '&::-webkit-scrollbar': {
            width: '4px',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
            borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.5)',
        },
    },
    productLeft: {
        borderRight: '1px solid #fff',
        height: '85vh',
    },
    technologyBtm: {
        marginTop: '52px',
        '& input[type="checkbox"]': {
            display: 'none',
            '& + label': {
                border: '1px solid #fff',
                borderRadius: '10px',
                padding: '15px 34px',
                display: 'block',
                fontSize: '18px',
                color: '#fff',
                position: 'relative',
                paddingLeft: '60px',
                '& span': {
                    display: 'inline-block',
                    width: '70%',
                    '&[class*="price"]': {
                        float: 'right',
                        width: '30%',
                        textAlign: 'right',
                    },
                },
                '&:last-child': {
                    marginBottom: '0',
                },
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
                    transform: 'rotate(45deg) translateX(-5px)',
                    top: '40%',
                    left: '37px',
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
        borderTop: '1px solid #fff',
        marginTop: '30px',
        paddingTop: '36px',
        '& button': {
            cursor: 'pointer',
            fontSize: '18px',
            textDecoration: 'underline',
            border: 'none',
            background: 'none',
            color: '#fff',
            fontWeight: '500',
            '&:focus': {
                outline: 'none',
            }
        },
        '& h5': {
            marginBottom: '20px',
        },
        '& ul': {
            paddingLeft: '30px',
            '& li': {
                listStyle: 'disc',
                letterSpacing: '-0.01em',
            },
        },
    },
    fixImg: {
        height: '88vh',
        width: '100%',
        objectFit: 'cover',
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
        <div className={classes.root}>
            <div className={classes.container}>
                <div className="row">
                    <div className="col-lg-7 col-md-12">
                        <div className={classes.productLeft}>
                            <figure>
                                <img src={`images/technology-img.png`} className={classes.fixImg} />
                            </figure>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12">
                        <div className={classes.productRight}>
                            <h4>Captains Smart Watch</h4>
                            <p>X Shore develops its own software on the Garmin platform. The watch is a Garmin MARQ Smart Watch with X Shore own software installed</p>
                            <div className={classes.rightBtm}>
                                <h5>Includes</h5>
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
                                        <input type="checkbox" onClick={handleOnTechnologyChange} id="captainsWatch" name="captainsWatch" value="captainsWatch" defaultChecked={router.query?.t} />
                                        <label htmlFor="captainsWatch"><span>Select Captains Watch </span><span className="price">2,500 €</span></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoatConfiguratorTechnology;
