import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useCookies } from 'react-cookie';
import configuratorHelper from '../configurator-helper'
import { useRouter } from 'next/router'

export const useStyles = makeStyles(theme => ({
    root: {
    },
    container: {
        maxWidth: '1440px',
        padding: '0 15px',
        width: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    productRight: {
        '& h4': {
            marginBottom: '28px',
            marginTop: '40px',
            textAlign: 'center',
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
        paddingTop: '34px',
    },
    rightBtm: {
        '& h5': {
            marginBottom: '10px',
        },
        '& ul': {
            paddingLeft: '30px',
            '& li': {
                listStyle: 'disc',
                letterSpacing: '-0.01em',
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
                padding: '0 30px',
                display: 'block',
                fontSize: '12px',
                color: '#fff',
                height: '58px',
                lineHeight: '58px',
                position: 'relative',
                paddingLeft: '60px',
                '& span': {
                    float: 'right',
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
    selectColor: {
        marginTop: '40px',
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
        <div id="mobile-addons" className={classes.root}>
            <div className={classes.productLeft}>
                <figure>
                    <img src={`images/add-ons-img.png`} className={classes.fixImg} />
                </figure>
            </div>
            <div className={classes.container}>
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
                            <input type="checkbox" id="dockingPackageMob" name="packageMob" onClick={handleOnAddOnsChange} value="ad" data-price="4500" defaultChecked={router.query?.ad}/>
                            <label htmlFor="dockingPackageMob">Select Docking Package <span>4,500 €</span></label>
                            </div>
                        </div>
                    </div>
                    <div className={classes.selectColor}>
                        <img src={`images/9X6A6514.jpg`} />
                        <h4>Premium Sound</h4>
                        <div className={classes.rightBtm}>
                            <h5>Includes</h5>
                            <ul className="tech-list">
                                <li>Premium audio with 4 upgraded hand made speakers which creates a fully immersive sound</li>
                            </ul>
                        </div>
                    </div>
                    <div className={classes.technologyBtm}>
                        <div className={classes.interiorLayoutInner}>
                        <div className="select-box">
                            <input type="checkbox" id="premiumPackageMob" name="packageMob" onClick={handleOnAddOnsChange} value="ap" data-price="4500" defaultChecked={router.query?.ap}/>
                            <label htmlFor="premiumPackageMob">Select Premium Package <span>4,500 €</span></label>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoatConfiguratorAddOns;