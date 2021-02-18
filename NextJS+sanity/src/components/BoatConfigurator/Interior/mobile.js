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
        padding: '0 15px',
        width: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    interiorLayout: {
        
    },
    productLeft: {
        paddingTop: '34px',
        paddingBottom: '40px',
    },
    productRight: {
        '& h4': {
            marginBottom: '30px',
            textAlign: 'center',
        },
        '& p': {
            textAlign: 'center',
        },
    },
    selectBox: {
        marginBottom: '20px',
        '&:last-child': {
            marginBottom: '35px',
        },
    },
    interiorLayoutInner: {
        '& label span': {
            float: 'right',
        },
        '& input[type="checkbox"]': {
            display: 'none',
            '& + label': {
                border: '1px solid #fff',
                borderRadius: '10px',
                padding: '0 28px',
                display: 'block',
                fontSize: '12px',
                color: '#fff',
                height: '45px',
                lineHeight: '45px',
                position: 'relative',
                '&:last-child': {
                    marginBottom: '0',
                },
                '&:before': {
                    content: '""',
                    display: 'block',
                    width: '8px',
                    height: '14px',
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    opacity: '0.6',
                    transition: 'all .12s, border-color .08s',
                }
            },
            '&:checked': {
                '& + label': {
                    fontWeight: '700',
                    '&:before': {
                        width: '8px',
                        top: '11px',
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
    const [cookies, setCookie] = useCookies(['i1', 'i2']);
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
        $('input[name="mobcolor"]').change(function(){
            const urlParams = new URLSearchParams(window.location.search);
            if(urlParams.has('i1') === false && urlParams.has('i2') === false ) {
                setsofaImg(BoatData[urlParams.get('e')].img)
            }
        })
    }

    return (
        <div id="mobile-interior" className="middle-content">
            <div className={classes.productLeft}>
                <figure>
                    <img src={`images/`+sofaImg+`.png`} />
                </figure>
            </div>
            <div className={classes.container}>
                <div className={classes.productRight}>
                    <div className={classes.interiorLayout}>
                        <h4>Select Interior Layout</h4>
                        <div className={classes.interiorLayoutInner}>
                        <div className={classes.selectBox}>
                            <input type="checkbox" id="box-1Mob" name="sofasMob" value="i2" data-price="10500" onClick={handleOnInteriorChange} defaultChecked={router.query?.i2} />
                            <label htmlFor="box-1Mob">Two sofas with table (recommended) <span>10,500 €</span></label>
                        </div>
                        <div className={classes.selectBox}>
                            <input type="checkbox" id="box-2Mob" name="sofasMob" value="i1" data-price="4500" onClick={handleOnInteriorChange} defaultChecked={router.query?.i1} />
                            <label htmlFor="box-2Mob">One standalone Sofa <span>4,500 €</span></label>
                        </div>
                        </div>
                    </div>
                    <p>X Shores furnitures and tables are all movable on the boats deckrails and can be convertible to sunbeds</p>
                </div>
            </div>
        </div>
    )
}

export default BoatConfiguratorInterior;