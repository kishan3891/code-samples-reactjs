import React from 'react'
import { useRouter } from "next/router";
import { makeStyles } from '@material-ui/core/styles'
import { useCookies } from 'react-cookie';
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import { useForm } from 'react-hook-form'
import { TextareaAutosize } from '@material-ui/core';

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
        padding: '0 15px',
        width: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    productRight: {
        '& h4': {
            marginBottom: '22px',
        },
    },
    backBtn: {
        margin: '15px 0',
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
        paddingTop: '30px',
        '& form': {
            '& h4': {
                marginBottom: '18px',
                fontSize: '18px',
                fontWeight: '700',
                lineHeight: '28px',
            },
            '& label': {
                display: 'block',
                fontSize: '12px',
                lineHeight: '20px',
                fontWeight: '700',
            },
            '& input, textarea': {
                background: 'transparent',
                width: '100%',
                height: '40px',
                fontSize: '12px',
                lineHeight: '20px',
                padding: '0 22px',
                color: '#E4EBF6',
            },
            '& [class*="input-msg"]': {
                '& textarea': {
                    height: '88px !important',
                    lineHeight: '22px',
                    fontSize: '12px',
                    padding: '18px',
                },
            },
        },
        '& p': {
            fontSize: '12px',
            lineHeight: '18px',
        },
        '& button': {
            padding: '0',
            margin: '0',
        },
    },
    inputCol: {
        marginBottom: '16px',
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
        marginBottom: '27px',
        '& h4': {
            marginBottom: '14px',
        },
        '& a': {
            color: '#AD916E !important',
            textDecoration: 'underline !important',
            display: 'block',
            marginBottom: '10px',
        },
    },
    paymentRightBottom: {
        '& h4': {
            fontSize: '18px',
            lineHeight: '28px',
            fontWeight: '700',
        },
        '& ul li': {
            fontSize: '12px',
            lineHeight: '20px',
            marginBottom: '20px',
            '&:after': {
                content: '""',
                display: 'block',
                clear: 'both',
            },
            '&:last-child': {
                marginBottom: 0,
                fontWeight: '700',
            },
            '& span': {
                maxWidth: '228px',
                float: 'left',
                width: '100%',
            },
            '& font': {
                float: 'right',
            }
        }
    }
}))

export const BoatConfiguratorSummary = props => {
    const classes = useStyles()
    const router = useRouter();
    const [cookies] = useCookies(['BoatColor', 'BoatColorPrice', 'boatSofa1', 'boatSofa2', 'captainsWatch', 'dockingPackage', 'premiumPackage', 'boatTotalPrice']);
    const { register, handleSubmit, errors, formState } = useForm({ mode: 'onChange' })

    function handleOnClickBack() {
        router.back()
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className="row">
                    <div className="col-md-12">
                        <div className={classes.backBtn}>
                            <a href="javascrip:void(0)" onClick={handleOnClickBack} className="edit-design"><img src={`images/back-arrow.svg`} /> Edit Design</a>
                        </div>
                        <div className={classes.productRight}>
                            <div className={classes.paymentRightTop}>
                                <figure>
                                    <img id="imgID" src={`images/payment-img.png`} />
                                </figure>
                                <h4>Your Eelex 8000</h4>
                                <a>Estimated delivery time: Summer 2020</a>
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
                                    {cookies.boatSofa2 && cookies.boatSofa2 != '0' ?
                                    <li>
                                        <span>Two sofas with table</span>
                                        <font>{cookies.boatSofa2}€</font>
                                    </li>
                                    : ''
                                    }

                                    {cookies.boatSofa1 && cookies.boatSofa1 != '0' ?
                                    <li>
                                        <span>One standalone Sofa</span>
                                        <font>{cookies.boatSofa1}€</font>
                                    </li>
                                    : ''
                                    }

                                    {cookies.captainsWatch &&
                                    <li>
                                        <span>Garmin Captains Watch</span>
                                        <font>{cookies.captainsWatch}€</font>
                                    </li>
                                    }

                                    {cookies.dockingPackage && cookies.dockingPackage != 0 ?
                                    <li>
                                        <span>X Shore Docking Package</span>
                                        <font>{cookies.dockingPackage}€</font>
                                    </li>
                                    : ''
                                    }

                                    {cookies.premiumPackage && cookies.premiumPackage != 0 ?
                                    <li>
                                        <span>X Shore Premium Package</span>
                                        <font>{cookies.premiumPackage}€</font>
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
                    <div className="col-md-12">
                        <div className={classes.productLeft}>
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
                </div>
            </div>
        </div>
    )
}

export default BoatConfiguratorSummary;
