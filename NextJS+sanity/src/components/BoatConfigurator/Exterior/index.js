import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router'
import configuratorHelper from '../configurator-helper'
import BoatData from '../boatdata.json'
import { ProxyContext } from '../../../context/proxy-context'

export const useStyles = makeStyles(theme => ({
    root: {
        '& [class*="show-more-height"]': { 
            height: '198px', 
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
    productLeft: {
        borderRight: '1px solid #fff',
        paddingTop: '83px',
        height: '85vh',
        '@media (max-height: 890px)': {
            paddingTop: '70px',
            '& img': {
                maxWidth: '770px',
            }
        },
        '@media (max-height: 850px)': {
            paddingTop: '70px',
            '& img': {
                maxWidth: '690px',
            }
        },
        '@media (max-height: 800px)': {
            paddingTop: '50px',
            '& img': {
                maxWidth: '660px',
            }
        },
        '@media (max-height: 768px)': {
            textAlign: 'center',
            '& img': {
                maxWidth: '640px',
            }
        }
    },
    colorBox: {
        marginRight: '26px',
        '&:last-child': {
            marginRight: '0',
        },
    },
    productRight: {
        paddingTop: '43px',
        height: '85vh',
        paddingBottom: '80px',
        overflowY: 'auto',
        paddingRight: '63px',
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
    SelectColor: {
        marginBottom: '36px',
        borderTop: '1px solid #fff',
        paddingTop: '24px',
        marginTop: '8px',
        '& h5': {
            marginBottom: '33px',
        }
    },
    customRadios: {
        paddingLeft: '24px',
        '& > div': {
            display: 'inline-block',
        },
        '& input[type="radio"]': {
            display: 'none',
            '& + label': {
                position: 'relative',
                zIndex: '1',
                margin: '0',
                '& span': {
                    display: 'inline-block',
                    width: '72px',
                    height: '72px',
                    margin: '-1px 4px 0 0',
                    verticalAlign: 'middle',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    textAlign: 'center',
                    lineHeight: '44px',
                    position: 'relative',
                    '&:before': {
                        content: '""',
                        opacity: '0',
                        width: '10px',
                        height: '20px',
                        border: 'solid',
                        borderWidth: '0 3px 3px 0',
                        transform: 'rotate(45deg)',
                        position: 'absolute',
                        top: '22px',
                        left: '30px',
                        borderRadius: '3px 0px 3px 0px',
                    },
                },
            },
            '&[id="color-1"] + label span': {
                backgroundColor: '#ffffff',
            },
            '&[id="color-2"] + label span': {
                backgroundColor: '#737163',
            },
            '&[id="color-3"] + label span': {
                backgroundColor: '#212021',
            },
            '&:checked + label span:before': {
                opacity: '1',
                borderColor: '#AD916E',
            },
            '&:checked + label:after': {
                opacity: '1',
            },
        },
    },
    leftBtm: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '20px',
        '& li': {
            textAlign: 'center',
            borderRight: '1px solid #FFFFFF',
            paddingRight: '48px',
            marginRight: '48px',
            paddingTop: '22px',
            paddingBottom: '22px',
            '& font': {
                display: 'block',
                fontSize: '36px',
                lineHeight: '34px',
                marginBottom: '10px',
            },
            '& span': {
                fontSize: '17px',
            },
            '&:last-child': {
                marginRight: '0',
                borderRight: 'none',
            },
            '@media (max-height: 768px)': {
                width: '100%',
                paddingRight: '0',
                marginRight: '0',
            },
        },
    },
    rightBtm: {
        '& h5': {
            marginBottom: '15px',
        },
        '& ul': {
            paddingLeft: '30px',
            '& li': {
                listStyle: 'disc',
                letterSpacing: '-0.01em',
            },
        },
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
        }
    },
    rightTopLine: {
        borderBottom: '1px solid #fff',
        paddingBottom: '10px',
        marginBottom: '24px',
        '& span': {
            float: 'left',
        },
        '& font': {
            float: 'right',
        },
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block',
        },
    },
}))

export const BoatConfiguratorExterior = props => {
    const [proxy] = useContext(ProxyContext)
    const { ipAddress, countryName, isProxy, proxyType } = proxy
    console.log(ipAddress)
    console.log(countryName)
    const classes = useStyles()
    const [cookies, setCookie] = useCookies(['BoatColorPrice']);
    const router = useRouter()
    var defaultColor = 'c1'
    if(router.query?.e) {
        defaultColor = router.query?.e
    }
    else {
        React.useEffect(() => {
            const urlParams = new URLSearchParams();
            urlParams.set('e', defaultColor)
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + urlParams.toString();
            window.history.pushState({path:newurl},'',newurl);
        }, []);
    }
	const [boatColor, setBoatColor] = useState(BoatData[defaultColor].color);

    function handleOnColorChange(el) {
        setCookie('BoatColorPrice', el.target.getAttribute("data-price"), { path: '/' });
        configuratorHelper.addParamToUrl('e', el.target.value)
        const urlParams = new URLSearchParams(window.location.search);
        var paramString = configuratorHelper.getParamStringOnChange(urlParams)
        setBoatColor(BoatData[paramString].color)
        setCookie('BoatColor', BoatData[paramString].color, { path: '/' });
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className="row">
                    <div className="col-lg-7 col-md-12">
                        <div className={classes.productLeft}>
                            <figure>
                                <img src={`images/`+boatColor+`.png`} />
                            </figure>
                            <ul className={classes.leftBtm}>
                                <li>
                                    <font>+100 NM</font>
                                    <span>Range</span>
                                </li>
                                <li>
                                    <font>+100 NM</font>
                                    <span>Range</span>
                                </li>
                                <li>
                                    <font>+100 NM</font>
                                    <span>Range</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12">
                        <div className={classes.productRight}>  
                            <h4>Eelex 8000</h4>
                            <p>All boats have Liquid-cooled 225 KW doctric motor and 120KWh battery on a 8mhull.</p>
                            <div className={classes.SelectColor}>
                                <h5>Select Color</h5>
                                <div className={classes.customRadios}>
                                    <div className={classes.colorBox}>
                                    <input type="radio" id="color-1" name="color" data-price="0" value="c1" onChange={handleOnColorChange.bind(this)} defaultChecked={boatColor === "Sandy"} />
                                    <label htmlFor="color-1">
                                        <span></span>
                                    </label>
                                    </div>
                                    
                                    <div className={classes.colorBox}>
                                    <input type="radio" id="color-2" name="color" data-price="8500" onChange={handleOnColorChange.bind(this)} value="c2" defaultChecked={boatColor === "Moss Green"} />
                                    <label htmlFor="color-2">
                                        <span></span>
                                    </label>
                                    </div>
                                    
                                    <div className={classes.colorBox}>
                                    <input type="radio" id="color-3" name="color" data-price="15000" onChange={handleOnColorChange.bind(this)} value="c3" defaultChecked={boatColor === "Coffee"} />
                                    <label htmlFor="color-3">
                                        <span></span>
                                    </label>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.rightBtm}>
                                <div className={classes.rightTopLine}>
                                    <span>{boatColor}</span>
                                    <font>{cookies.BoatColorPrice && cookies.BoatColorPrice != 0 ? cookies.BoatColorPrice+' €' : 'Included' }</font>
                                </div>
                                <h5>Includes</h5>
                                <ul className="text show-more-height">
                                    <li> Garmin 24-inch, waterproof and anti-glare touchscreen</li>
                                    <li> Garmin marine & satellite maps for your area</li>
                                    <li> 3 step foldable swim ladder in the stern</li>
                                    <li> Lanterns</li>
                                    <li> Over-The-Air software updates</li>
                                    <li> Standard stereo audio-system</li>
                                    <li> Smart charging-cable</li>
                                    <li> Garmin 24-inch, waterproof and anti-glare touchscreen</li>
                                    <li> Garmin marine & satellite maps for your area</li>
                                    <li> 3 step foldable swim ladder in the stern</li>
                                    <li> Lanterns</li>
                                    <li> Over-The-Air software updates</li>
                                    <li> Standard stereo audio-system</li>
                                    <li> Smart charging-cable</li>
                                </ul>
                                <button id="next" className="show-more">Show more</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoatConfiguratorExterior;
