import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useCookies } from 'react-cookie';
import configuratorHelper from '../configurator-helper'
import { useRouter } from 'next/router'

export const useStyles = makeStyles(theme => ({
    root: {
        '& [class*="show-more-height"]': { 
            height: '55px', 
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
            marginBottom: '15px',
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
    rightBtm: {
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
                '&[class*="list-none"]': {
                    listStyle: 'none !important',
                    marginTop: '10px',
                }
            },
        },
    },
    selectColor: {
        marginTop: '37px',
        paddingTop: '30px',
        '& h5': {
            marginBottom: '16px',
        },
    },
    technologyBtm: {
        marginTop: '32px',
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
                    width: '69%',
                    '&[class*="price"]': {
                        float: 'right',
                        width: '31%',
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
    fixImg: {
        height: '88vh',
        width: '100%',
        objectFit: 'cover',
    },
    selectColor: {
        marginTop: '37px',
        paddingTop: '30px',
        marginBottom: '40px',
        borderTop: '1px solid #fff',
    },
}))

export const BoatConfiguratorAddOns = props => {
    const classes = useStyles()
    const [cookies, setCookie] = useCookies(['ap', 'ad']);
    const router = useRouter()

    function handleOnAddOnsChange(el) {
        if(el.target.checked) {
            setCookie(el.target.value, el.target.getAttribute("data-price"), { path: '/' });
            configuratorHelper.addParamToUrl(el.target.value, el.target.value)
        }
        else {
            setCookie(el.target.value, '0', { path: '/' });
            configuratorHelper.removeParamFromUrl(el.target.value)
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className="row">
                <div className="col-lg-7 col-md-12">
                    <div className={classes.productLeft}>
                    <figure>
                        <img src={`images/add-ons-img.png`} className={classes.fixImg} />
                    </figure>
                    </div>
                </div>
                <div className="col-lg-5 col-md-12">
                    <div className={classes.productRight}>
                    <h4>Docking Package</h4>
                    <div className={classes.rightBtm}>
                        <h5>Includes</h5>
                        <ul>
                        <li>Stainless Premium Anchor</li>
                        <li>Six Fenders</li>
                        <li>Custom X Shore Fender Covers</li>
                        <li>Docking ropes and Mooring Line</li>
                        </ul>
                    </div>
                    <div className={classes.technologyBtm}>
                        <div className={classes.interiorLayoutInner}>
                            <div className="select-box">
                            <input type="checkbox" id="dockingPackage" name="package" onClick={handleOnAddOnsChange} value="ad" data-price="4500" defaultChecked={router.query?.ad}/>
                            <label htmlFor="dockingPackage"><span>Select Docking Package </span><span className="price">4,500 €</span></label>
                            </div>
                        </div>
                    </div>
                    <div className={classes.selectColor}>
                        <h4>Premium Sound</h4>
                        <div className={classes.rightBtm}>
                        <h5>Includes</h5>
                        <ul className="tech-list show-more-height text">
                            <li>Premium audio with 4 upgraded hand made speakers which creates a fully immersive sound</li>
                            <li className="list-none">
                                <img src={`images/preminum-sound.jpg`} />
                            </li>
                        </ul>
                        <button id="load-more" className="show-more">Show Details</button>
                        </div>
                    </div>
                    <div className={classes.technologyBtm}>
                        <div className={classes.interiorLayoutInner}>
                        <div className="select-box">
                            <input type="checkbox" id="premiumPackage" name="package" onClick={handleOnAddOnsChange} value="ap" data-price="4500" defaultChecked={router.query?.ap}/>
                            <label htmlFor="premiumPackage"><span>Select Premium Package </span><span className="price">4,500 €</span></label>
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

export default BoatConfiguratorAddOns;
