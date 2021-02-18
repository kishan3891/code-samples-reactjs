import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useCookies } from 'react-cookie';
import dynamic from 'next/dynamic';

const ReactToPdf = dynamic(
    () => import('react-to-pdf'),
    {
        ssr: false
    }
)

export const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: '100px',
        paddingBottom: '50px',
        '& h4': {
            marginBottom: '10px',
            paddingTop: '15px',
        },
    },
    container: {
        maxWidth: '1440px',
        padding: '0',
        width: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
        '@media (max-width: 767px)': {
            padding: '0 15px',
        },
    },
    paymentRightTop: {
        textAlign: 'center',
        paddingBottom: '20px',
        borderBottom: '1px solid #fff',
    },
    paymentRightBottom: {
        '& [class*="step-info"]': {
            marginBottom: '20px',
        },
        '& a': {
            color: '#AD916E',
            fontSize: '20px',
            lineHeight: '28px',
            textAlign: 'center',
            textDecoration: 'underline',
            display: 'block',
            marginTop: '30px',
        },
        '& ul li': {
            fontSize: '18px',
            lineHeight: '24px',
            marginBottom: '28px',
            '&:after': {
                content: '""',
                display: 'block',
                clear: 'both',
            },
            '&:last-child': {
                marginBottom: 0,
                fontWeight: '700',
                paddingBottom: '7px',
            },
            '& span': {
                maxWidth: '361px',
                float: 'left',
                width: '100%',
                '@media (max-width: 479px)': {
                    maxWidth: '228px',
                },
            },
            '& font': {
                float: 'right',
            }
        }
    },
    pdfArea: {
        '& [class*="contentArea"]': {
            padding: '20px',
        },
        '& h1': {
            marginBottom: '30px',
        },
        '& figure': {
            textAlign: 'center',
        },
        '& [class*="feature"]': {
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid',
            paddingBottom: '30px',
            marginBottom: '40px',
            '& li': {
                textAlign: 'center',
                borderRight: '1px solid #FFFFFF',
                width: '100%',
                padding: '15px 0',
                '& font': {
                    display: 'block',
                    fontSize: '2.8rem',
                    lineHeight: '50px',
                    marginBottom: '10px',
                },
                '& span': {
                    fontSize: '25px',
                },
                '&:last-child': {
                    marginRight: '0',
                    borderRight: 'none',
                },
            },
        },
        '& [class*="list"] li': {
            fontSize: '18px',
            lineHeight: '24px',
            marginBottom: '28px',
            '&:after': {
                content: '""',
                display: 'block',
                clear: 'both',
            },
            '&:last-child': {
                fontWeight: '700',
            },
            '& span': {
                maxWidth: '361px',
                float: 'left',
                width: '100%',
            },
            '& font': {
                float: 'right',
            }
        }
    }
}))

export const BoatConfiguratorThanks = props => {
    const classes = useStyles()
    const pdfRef = React.createRef()
    const [cookies, setCookie] = useCookies([
        'BoatColor',
		'BoatColorPrice',
		'i1',
		'i2',
		'captainsWatch',
		'ap',
		'ad',
        'boatTotalPrice'
	]);

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className="row justify-content-md-center">
                    <div className="col-lg-6 col-md-12">
                        <div className={classes.productRight}>
                            <div className={classes.paymentRightTop}>
                                <figure>
                                    <img id="imgID" src={`images/payment-img.png`} />
                                </figure>
                                <h4>Thank you</h4>
                                <p>We are reviewing your request</p>
                            </div>
                            <div className={classes.paymentRightBottom}>
                                <div className="step-info">
                                    <h4>Next Steps</h4>
                                    <p>We are currently reviewing your configuration and a sales advisor will contact you within 48 hours to confirm your interest and configuration to save your spot in the production. An advisor will help you with your contract and help you with ways of payment.</p>
                                </div>
                                <h4>Summary</h4>
                                <ul>
                                    <li>
                                        <span>Eelex 8000 2021 Edition, 225 kW motor, 120 kWh batteries</span>
                                        <font>249,000€</font>
                                    </li>

                                    {cookies.BoatColorPrice != '0' ?
                                    <li>
                                        <span>{cookies.BoatColor}</span>
                                        <font>{cookies.BoatColorPrice}€</font>
                                    </li>
                                    : ''
                                    }
                                    {cookies.i2 && cookies.i2 != '0' ?
                                    <li>
                                        <span>Two sofas with table</span>
                                        <font>{cookies.i2}€</font>
                                    </li>
                                    : ''
                                    }

                                    {cookies.i1 && cookies.i1 != '0' ?
                                    <li>
                                        <span>One standalone Sofa</span>
                                        <font>{cookies.i1}€</font>
                                    </li>
                                    : ''
                                    }

                                    {cookies.captainsWatch &&
                                    <li>
                                        <span>Garmin Captains Watch</span>
                                        <font>{cookies.captainsWatch}€</font>
                                    </li>
                                    }

                                    {cookies.ad && cookies.ad != 0 ?
                                    <li>
                                        <span>X Shore Docking Package</span>
                                        <font>{cookies.ad}€</font>
                                    </li>
                                    : ''
                                    }

                                    {cookies.ap && cookies.ap != 0 ?
                                    <li>
                                        <span>X Shore Premium Package</span>
                                        <font>{cookies.ap}€</font>
                                    </li>
                                    : ''
                                    }

                                    <li>
                                        <span>Cash Price Exc VAT</span>
                                        <font>{cookies.boatTotalPrice}€</font>
                                    </li>
                                </ul>
                                <ReactToPdf targetRef={pdfRef} filename="div-blue.pdf">
                                    {({toPdf}) => (
                                        <a href="javascript:void(0);" onClick={toPdf}>Save your design</a>
                                    )}
                                </ReactToPdf>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.pdfArea} style={{position: "absolute", left: "-1000px", top: 0, width: 800, height: 1500, background: '#12303C'}} ref={pdfRef}>
                <div className='logo'>
                    <a href="/"><img src={`images/logo.svg`} /></a>
                </div>
                <div className='contentArea'>
                    <figure>
                        <img src={`images/payment-img.png`} />
                    </figure>
                    <ul className="feature">
                        <li>
                            <font>+100 NM</font>
                            <span>Range</span>
                        </li>
                        <li>
                            <font>35 Knots</font>
                            <span>Top Speed</span>
                        </li>
                        <li>
                            <font>25 Knots</font>
                            <span>Cruising speed</span>
                        </li>
                    </ul>
                    <h1>Summary</h1>
                    <ul className="list">
                        <li>
                            <span>Eelex 8000 2021 Edition, 225 kW motor, 120 kWh batteries</span>
                            <font>249,000€</font>
                        </li>
                        {cookies.BoatColor && cookies.BoatColorPrice != '0' ?
                        <li>
                            <span>{cookies.BoatColor}</span>
                            <font>{cookies.BoatColorPrice}€</font>
                        </li>
                        : ''
                        }
                        {cookies.i2 && cookies.i2 != '0' ?
                        <li>
                            <span>Two sofas with table</span>
                            <font>{cookies.i2}€</font>
                        </li>
                        : ''
                        }
                        {cookies.i1 && cookies.i1 != '0' ?
                        <li>
                            <span>One standalone Sofa</span>
                            <font>{cookies.i1}€</font>
                        </li>
                        : ''
                        }
                        {cookies.captainsWatch &&
                        <li>
                            <span>Garmin Captains Watch</span>
                            <font>{cookies.captainsWatch}€</font>
                        </li>
                        }
                        {cookies.ad && cookies.ad != 0 ?
                        <li>
                            <span>X Shore Docking Package</span>
                            <font>{cookies.ad}€</font>
                        </li>
                        : ''
                        }
                        {cookies.ap && cookies.ap != 0 ?
                        <li>
                            <span>X Shore Premium Package</span>
                            <font>{cookies.ap}€</font>
                        </li>
                        : ''
                        }
                        <li>
                            <span>Cash Price Exc VAT</span>
                            <font>{cookies.boatTotalPrice}€</font>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default BoatConfiguratorThanks;
