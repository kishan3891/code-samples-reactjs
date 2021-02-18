import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router'
import configuratorHelper from '../configurator-helper'
import BoatData from '../boatdata.json'

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
    productLeft: {
        '& h4': {
            padding: '15px 0',
            textAlign: 'center',
        },
    },
    colorBox: {
        marginRight: '26px',
        '&:last-child': {
            marginRight: '0',
        },
    },
    productRight: {
        '& p': {
            textAlign: 'center',
            padding: '0 15px',
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
        marginBottom: '24px',
        marginTop: '13px',
        textAlign: 'center',
        '& h5': {
            marginBottom: '7px',
        }
    },
    customRadios: {
        '& > div': {
            display: 'inline-block',
        },
        '& input[type="radio"]': {
            display: 'none',
            '& + label': {
                position: 'relative',
                zIndex: '1',
                '& span': {
                    display: 'inline-block',
                    width: '40px',
                    height: '40px',
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
                        width: '8.67px',
                        height: '13px',
                        border: 'solid',
                        borderWidth: '0 3px 3px 0',
                        transform: 'rotate(45deg)',
                        position: 'absolute',
                        top: '12px',
                        left: '16px',
                        borderRadius: '3px 0px 3px 0px',
                    },
                },
            },
            '&[id="mobcolor-1"] + label span': {
                backgroundColor: '#ffffff',
            },
            '&[id="mobcolor-2"] + label span': {
                backgroundColor: '#737163',
            },
            '&[id="mobcolor-3"] + label span': {
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
        margin: '24px 0',
        borderBottom: '1px solid #fff',
        paddingBottom: '14px !important',
        '& li': {
            textAlign: 'center',
            borderRight: '1px solid #FFFFFF',
            paddingTop: '8px',
            paddingBottom: '5px',
            listStyle: 'none !important',
            width: '100%',
            '& font': {
                display: 'block',
                fontSize: '18px',
                lineHeight: '21px',
            },
            '& span': {
                fontSize: '10px',
            },
            '&:last-child': {
                marginRight: '0',
                borderRight: 'none',
            },
        },
    },
    rightBtm: {
        '& h5': {
            marginBottom: '20px',
        },
        '& ul': {
            padding: '0 15px',
            '& li': {
                listStyleType: 'disc',
                letterSpacing: '-0.01em',
                listStylePosition: 'inside',
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
        textAlign: 'center',
        '& span': {
            float: 'left',
            width: '50%',
        },
        '& font': {
            float: 'right',
            width: '50%',
        },
        '&:after': {
            content: '""',
            clear: 'both',
            display: 'block',
        },
    },
}))

export const BoatConfiguratorExterior = props => {
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
        <div id="mobile-exterior" className={classes.root}>
            <div className={classes.container}>
                <div className="row">
                    <div className="col-lg-7 col-md-12">
                        <div className={classes.productLeft}>
                            <h4>Eelex 8000</h4>
                            <figure>
                                <img src={`images/`+boatColor+`.png`} />
                            </figure>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12">
                        <div className={classes.productRight}>  
                            <div className={classes.SelectColor}>
                                <h5>Select Color</h5>
                                <div className={classes.customRadios}>
                                    <div className={classes.colorBox}>
                                    <input type="radio" id="mobcolor-1" name="mobcolor" data-price="0" value="c1" onChange={handleOnColorChange.bind(this)} defaultChecked={boatColor === "Sandy"} />
                                    <label htmlFor="mobcolor-1">
                                        <span></span>
                                    </label>
                                    </div>
                                    <div className={classes.colorBox}>
                                    <input type="radio" id="mobcolor-2" name="mobcolor" data-price="8500" onChange={handleOnColorChange.bind(this)} value="c2" defaultChecked={boatColor === "Moss Green"} />
                                    <label htmlFor="mobcolor-2">
                                        <span></span>
                                    </label>
                                    </div>
                                    <div className={classes.colorBox}>
                                    <input type="radio" id="mobcolor-3" name="mobcolor" data-price="15000" onChange={handleOnColorChange.bind(this)} value="c3" defaultChecked={boatColor === "Coffee"} />
                                    <label htmlFor="mobcolor-3">
                                        <span></span>
                                    </label>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.rightBtm}>
                                <div className={classes.rightTopLine}>
                                    <span>{boatColor}</span>
                                    <font>{cookies.BoatColorPrice && cookies.BoatColorPrice != 0 ? cookies.BoatColorPrice+'€' : 'Included' }</font>
                                </div>
                                <p>All boats have Liquid-cooled 225 KW doctric motor and 120KWh battery on a 8mhull.</p>

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
