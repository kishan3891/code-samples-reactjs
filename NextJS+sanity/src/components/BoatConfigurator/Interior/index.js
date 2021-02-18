import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router'
import configuratorHelper from '../configurator-helper'
import BoatData from '../boatdata.json'
import $ from "jquery"

export const useStyles = makeStyles(theme => ({
    root: {

    },
    container: {
        maxWidth: '1440px',
        padding: '0',
        width: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    interiorLayout: {
        marginTop: '121px',
        '& h5': {
            marginBottom: '25px',
        },
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
    selectBox: {
        marginBottom: '30px',
        '&:last-child': {
            marginBottom: '0',
        },
    },
    interiorLayoutInner: {
        '& input[type="checkbox"]': {
            display: 'none',
            '& + label': {
                border: '1px solid #fff',
                borderRadius: '10px',
                padding: '15px 34px',
                display: 'block',
                fontSize: '18px',
                color: '#fff',
                height: '100%',
                lineHeight: 'normal',
                position: 'relative',
                '& span': {
                    display: 'inline-block',
                    width: '75%',
                    '&[class*="price"]': {
                        float: 'right',
                        width: '25%',
                        textAlign: 'right',
                    },
                },
                '&:last-child': {
                    marginBottom: '0',
                },
                '&:before': {
                    content: '""',
                    display: 'block',
                    width: '20px',
                    height: '20px',
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    opacity: '0.6',
                    transition: 'all .12s, border-color .08s',
                    webkitTransition: 'all .12s, border-color .08s',
                }
            },
            '&:checked': {
                '& + label': {
                    fontWeight: '700',
                    '&:before': {
                        width: '10px',
                        top: '15px',
                        left: '12px',
                        borderRadius: '0',
                        opacity: '1',
                        border: '2px solid #AD916E',
                        borderTopColor: 'transparent',
                        borderLeftColor: 'transparent',
                        transform: 'rotate(45deg)',
                    },
                },
            },
        },
    },
}))

export const BoatConfiguratorInterior = props => {
    const classes = useStyles()
    const [cookies, setCookie] = useCookies(['i1', 'i2', 'BoatColor']);
    const router = useRouter()

    var defaultIntr = 'c1'
    if(router.query?.i1 && router.query?.i2) {
        defaultIntr = defaultIntr + 'i1i2'
    }
    else if(router.query?.i1) {
        defaultIntr = defaultIntr + 'i1'
    }
    else if(router.query?.i2) {
        defaultIntr = defaultIntr + 'i2'
    }
    else {
        React.useEffect(() => {
            if(router.query?.e) {
                defaultIntr = router.query?.e
            }
            setsofaImg(BoatData[defaultIntr].img)
        }, [defaultIntr]);
    }

	const [sofaImg, setsofaImg] = useState(BoatData[defaultIntr].img);

    function handleOnInteriorChange(el) {
        if(el.target.checked) {
            setCookie(el.target.value, el.target.getAttribute("data-price"), { path: '/' });
            configuratorHelper.addParamToUrl(el.target.value, el.target.value)
        }
        else {
            setCookie(el.target.value, '0', { path: '/' });
            configuratorHelper.removeParamFromUrl(el.target.value)
        }
        const urlParams = new URLSearchParams(window.location.search);
        var paramString = configuratorHelper.getParamStringOnChange(urlParams)
        setsofaImg(BoatData[paramString].img)
    }

    if(typeof window !== 'undefined') {
        $('input[name="color"]').change(function(){
            const urlParams = new URLSearchParams(window.location.search);
            if(urlParams.has('i1') === false && urlParams.has('i2') === false ) {
                setsofaImg(BoatData[urlParams.get('e')].img)
            }
        })
    }

    return (
        <div className="middle-content">
            <div className={classes.container}>
                <div className="row">
                <div className="col-lg-7 col-md-12">
                    <div className={classes.productLeft}>
                        <figure>
                            <img src={`images/`+sofaImg+`.png`} />
                        </figure>
                    </div>
                </div>
                <div className="col-lg-5 col-md-12">
                    <div className={classes.productRight}>
                        <h4>Interior</h4>
                        <p>X Shores furnitures and tables are all movable on the boats deckrails and can be convertible to <br/>sunbeds</p>
                        <div className={classes.interiorLayout}>
                            <h5>Select Interior Layout</h5>
                            <div className={classes.interiorLayoutInner}>
                            <div className={classes.selectBox}>
                                <input type="checkbox" id="box-1" name="sofas1" value="i2" data-price="10500" onClick={handleOnInteriorChange} defaultChecked={router.query?.i2} />
                                <label htmlFor="box-1"><span>Two sofas with table (recommended) </span><span className="price">10,500 €</span></label>
                            </div>
                            <div className={classes.selectBox}>
                                <input type="checkbox" id="box-2" name="sofas2" value="i1" data-price="4500" onClick={handleOnInteriorChange} defaultChecked={router.query?.i1} />
                                <label htmlFor="box-2"><span>One standalone Sofa </span><span className="price">4,500 €</span></label>
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

export default BoatConfiguratorInterior;
