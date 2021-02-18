import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useCookies } from 'react-cookie';
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import { useForm } from 'react-hook-form'
import { TextareaAutosize } from '@material-ui/core';
import dynamic from 'next/dynamic';

const ReactToPdf = dynamic(
    () => import('react-to-pdf'),
    {
        ssr: false
    }
)

import {
    TextField,
    Button,
    Box,
    Typography,
} from 'components'

export const useStyles = makeStyles(theme => ({
    root: {
        '& [class*="payment-submit"]': {
            opacity: '0',
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
        '& h4': {
            marginBottom: '22px',
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
    backBtn: {
        marginBottom: '55px',
        '& img': {
            position: 'relative',
            top: '-2px',
            marginRight: '16px',
        },
        '& a': {
            color: '#fff',
            fontSize: '18px',
        }
    },
    productLeft: {
        paddingLeft: '50px',
        paddingRight: '55px',
        paddingTop: '20px',
        borderRight: '1px solid #fff',
        height: '85vh',
        '& form': {
            '& h4': {
                borderBottom: '1px solid #fff',
                paddingBottom: '13px',
                marginBottom: '43px',
            },
            '& label': {
                display: 'block',
                fontSize: '22px',
                marginBottom: '9px',
            },
            '& input, textarea': {
                background: 'transparent',
                width: '100%',
                height: '45px',
                lineHeight: '45px',
                padding: '0 22px',
                color: '#E4EBF6',
            },
            '& [class*="input-msg"]': {
                '& textarea': {
                    height: '140px !important',
                    lineHeight: '24px',
                    paddingTop: '14px',
                    paddingBottom: '20px',
                },
            },
        },
        '& p': {
            fontSize: '15px',
            lineHeight: '25px',
        },
    },
    inputCol: {
        marginBottom: '35px',
        width: '47%',
        display: 'inline-block',
        '&:nth-child(even)': {
            marginLeft: '6%',
        },
    },
    
    frmInput: {
        '&:after': {
            content: '""',
            display: 'block',
            clear: 'both',
        },
    },
    paymentRightTop: {
        textAlign: 'center',
        marginBottom: '37px',
        marginTop: '-10px',
        '& h4': {
            marginTop: '-20px',
            marginBottom: '0px',
        },
        '& a': {
            color: '#AD916E',
            textDecoration: 'underline',
            display: 'block',
            marginBottom: '10px',
        },
    },
    paymentRightBottom: {
        '& h4': {
            borderBottom: '1px solid #fff',
            paddingBottom: '13px',
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
                borderBottom: '1px solid #fff',
                paddingBottom: '7px',
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

function handleEditDesign() {
	document.getElementById("services-tabs-tab-1").click();
}

export const BoatConfiguratorSummary = props => {
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
    const { register, handleSubmit, errors, formState } = useForm({ mode: 'onChange' })

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className="row">
                    <div className="col-lg-7 col-md-12">
                        <div className={classes.productLeft}>
                            <div className={classes.backBtn}>
                                <a href="javascript:void(0);" className="edit-design" onClick={handleEditDesign}><img src={`images/back-arrow.svg`} /> Edit Design</a>
                            </div>
                            <MailchimpSubscribe
                            url="https://xshore.us17.list-manage.com/subscribe/post?u=dd0717a7364c19e3effea7b2e&amp;id=6a508c28a0"
                            render={({ subscribe, status, message }) => {
                                const onSubmit = data => {
                                    subscribe({
                                        EMAIL: data.email,
                                        FIRSTNAME: data.firstName,
                                        LASTNAME: data.lastName,
                                        PHONE: data.phone,
                                        MESSAGE: data.message,
                                        TYPE: "buyer",
                                    })
                                }

                                return status === 'success' ? (
                                    window.location.replace("/thank-you")
                                ) : (
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <h4>Enter your details</h4>
                                    <div className={classes.frmInput}>
                                        <div className={classes.inputCol}>
                                            <label>First Name</label>
                                            <TextField
                                            name="firstName"
                                            inputRef={register({ required: true })}
                                            placeholder="e.g, John"
                                            error={!!errors.firstName}
                                            helperText={errors.firstName && 'First name is required'}
                                            fullWidth
                                            />
                                        </div>
                                        <div className={classes.inputCol}>
                                            <label>Last Name</label>
                                            <TextField
                                            name="lastName"
                                            inputRef={register({ required: true })}
                                            placeholder="e.g, Doe"
                                            error={!!errors.lastName}
                                            helperText={errors.lastName && 'Last name is required'}
                                            fullWidth
                                            />
                                        </div>
                                        <div className={classes.inputCol}>
                                            <label>Email</label>
                                            <TextField
                                            name="email"
                                            type="email"
                                            inputRef={register({
                                                required: true,
                                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            })}
                                            placeholder="e.g, John@server.com"
                                            error={!!errors.email}
                                            helperText={errors.email && 'Email is required'}
                                            fullWidth
                                            />
                                        </div>
                                        <div className={classes.inputCol}>
                                            <label>Phone Number</label>
                                            <TextField
                                            inputRef={register({
                                                required: true,
                                                pattern: /^([0-9]|\+| |-)+$/i,
                                            })}
                                            type="tel"
                                            name="phone"
                                            placeholder="e.g,  +12346666535"
                                            error={!!errors.phone}
                                            helperText={errors.phone && 'Invalid phone number'}
                                            fullWidth
                                            />
                                        </div>
                                    </div>
                                    <div className="input-msg">
                                        <label>Any information that you would like to add?</label>
                                        <TextareaAutosize
                                        placeholder="Enter your requirements and any information that you would like to add here........."
                                        rowsMin={3}
                                        aria-label="minimum height"
                                        name="message"
                                        className={classes.field}
                                        />
                                    </div>
                                    <p>By entering my account details above, I agree to be contacted about X Shoresproducts. This is not a condition of purchase. A sales executive from X Shore will contact you within 48 hours to book a virtual meeting with you by phone or by Microsoft Teams.</p>
                                    
                                    {status === 'error' && (
                                    <Typography color="error" dangerouslySetInnerHTML={{ __html: message}} />
                                    )}
                                    <Box mt={2} clone>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        className="payment-submit"
                                    >
                                        Send
                                    </Button>
                                    </Box>
                                </form>
                                )
                            }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12" >
                        <div className={classes.productRight}>
                            <div className={classes.paymentRightTop}>
                                <figure>
                                    <img id="imgID" src={`images/payment-img.png`} />
                                </figure>
                                <h4>Your Eelex 8000</h4>
                                <ReactToPdf targetRef={pdfRef} filename="div-blue.pdf">
                                    {({toPdf}) => (
                                        <a href="javascript:void(0);" onClick={toPdf}>Save your design</a>
                                    )}
                                </ReactToPdf>
                                <p>Estimated delivery time: Summer 2020</p>
                            </div>
                            <div className={classes.paymentRightBottom}>
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
                </div>
            </div>
        </div>
        
    )
}

export default BoatConfiguratorSummary;
