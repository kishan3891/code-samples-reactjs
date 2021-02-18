import { CloseCircleOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Col, Modal, Row, Select } from 'antd';
import React, { useState } from 'react';
import { GET_SCHOOLS, GetSchoolsResult } from '../../queries/common';
import { CheckMarkArrow } from "@components/icons/check-mark";
import { DropDownArrow } from '@components/icons/drop-down-arrow';
import { SearchIcon } from '@components/icons/search';
import { Auth } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import Loading from "@components/common/Loading";
import classnames from 'classnames';
import { handleSingIn, Providers } from "../../hooks/useAuth";
import ModalSignUp from "@components/modal/ModalSignUp";
import { useRouter } from 'next/router';

const { Option } = Select;

interface Props {
    conntainerID: number;
    visible: boolean;
    showModal: (boolean) => void;
    state?: Record<string, any>;
}

export default function ModalLogin({ visible, showModal, state, conntainerID }: Props) {
    const [school, setSchool] = useState(null);
    const [focused, setFocused] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [email, setEmail] = useState(null);
    const [visibleSignUp, showModalSignUp] = useState(false);
    const [isReavalPassword, setIsReavalPassword] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [forgotPasswordError, setforgotPasswordError] = useState(null);
    const [forgotPasswordSuccess, setforgotPasswordSuccess] = useState(null);
    const [codeSent, setCodeSent] = useState(false);
    const { data } = useQuery<GetSchoolsResult>(GET_SCHOOLS);
    const router = useRouter();
    const defaultValues = {
        email: '',
        password: '',
    };
    const [formData, setFormData] = useState(defaultValues);
    const forgotPasswordFormDefaultValues = {
        email: '',
        code: '',
        new_password: '',
    };
    const [forgotPasswordformData, setforgotPasswordformData] = useState(forgotPasswordFormDefaultValues);
    const [pageNumber, setPageNumber] = useState(1);
    const [formLoading, setLoadingState] = useState(false);
    const { register, handleSubmit, errors, watch } = useForm({
        reValidateMode: 'onSubmit',
    }); // initialize the hook

    const onSubmit = async (values) => {
        setforgotPasswordError(null);

        if (pageNumber === 2) {
            setLoadingState(true);
            const code = '000000'
            await Auth.confirmSignUp(formData.email, code, {
                // If set to False, the API will throw an AliasExistsException error if the phone number/email used already exists as an alias with a different user
                forceAliasCreation: false
            })
            .then(data => console.log(data))
            .catch( error => {
                console.log(error);
                switch ( error.code ) {
                    case 'UserNotFoundException':
                        // Only here, in .catch error block we actually send a user to sign up
                        setEmail(formData.email);
                        return showSignUpModal();
                    case 'NotAuthorizedException':
                    case 'AliasExistsException':
                        // Email alias already exists
                    case 'CodeMismatchException':
                    case 'ExpiredCodeException':
                    default:
                        return setPageNumber(3);
                }
            })
            setLoadingState(false);
        }

        if (!formLoading && pageNumber === 3) {
            // Clean error
            setLoginError(null);
            setLoadingState(true);
            await Auth.signIn(formData.email, formData.password)
                .then((data) => {
                    console.log(data);
                    const { pathname, search } = window.location;
                    return router.push({
                        pathname: `${pathname}${search}`,
                        query: state,
                    });
                })
                .catch((error) => {
                    setLoginError(error.message);
                });
            setLoadingState(false);
        }

        if (!formLoading && pageNumber === 4) {
            setLoadingState(true);
            await Auth.forgotPasswordSubmit(
                forgotPasswordformData.email,
                forgotPasswordformData.code,
                forgotPasswordformData.new_password,
            )
                .then((data) => {
                    setforgotPasswordError(null);
                    setforgotPasswordSuccess('New password has been set. You can login now.');
                    setTimeout(() => {
                        setPageNumber(3);
                    }, 2000);
                })
                .catch((error) => {
                    setforgotPasswordError(error.message);
                });
            setLoadingState(false);
        }
    };

    function handleInputChange(evt) {
        const value = evt.target.value;
        setFormData({
            ...formData,
            [evt.target.name]: value,
        });
    }

    function handleInputChangeForgotPassword(evt) {
        const value = evt.target.value;
        setforgotPasswordformData({
            ...forgotPasswordformData,
            [evt.target.name]: value,
        });
    }

    function handleChange(value) {
        const school = data.schools.find(x => x.name === value);

        setSchool(school.provider || school.loginUrl);
        return handleSingIn(school.provider || school.loginUrl, state, school.provider ? Providers.COGNITO : Providers.URL);
    }

    function onSearch(val) {
        setSearchText(val);
    }

    function onBlur() {
        setFocused(false);
    }

    function onFocus() {
        setFocused(true);
    }

    function renderLabel(item) {
        let label = item;
        if (searchText) {
            let index = label.toLowerCase().indexOf(searchText.toLowerCase());
            if (index !== -1) {
                let length = searchText.length;
                let prefix = label.substring(0, index);
                let suffix = label.substring(index + length);
                let match = label.substring(index, index + length);
                return (
                    <span>
                        {prefix}<span className="searchText">{match}</span>{suffix}
                    </span>
                );
            }
        }
        return (
            <span>
                {label}
            </span>
        );
    }

    function getBack() {
        setPageNumber(pageNumber - 1);
        setforgotPasswordError(null);
    }

    async function forgotPassword() {
        setLoadingState(true);
        setforgotPasswordformData({
            email: formData.email,
            new_password: null,
            code: null,
        });
        await Auth.forgotPassword(formData.email)
            .then((data) => {
                console.log(data);
                setPageNumber(4);
            })
            .catch((error) => {
                setforgotPasswordError(error.message);
            });
        setLoadingState(false);
    }

    async function resendOTP() {
        setLoadingState(true);
        await Auth.forgotPassword(formData.email)
            .then((data) => {
                console.log(data);
                setCodeSent(true);
                setTimeout(() => {
                    setCodeSent(false);
                }, 3000);
            })
            .catch((error) => {
                setforgotPasswordError(error.message);
            });
        setLoadingState(false);
    }

    function closeModal() {
        showModal(false);
        setFormData(defaultValues);
        setforgotPasswordError(null);
        setPageNumber(1);
    }

    function showSignUpModal() {
        closeModal();
        showModalSignUp(true);
    }

    return (
        <>
            <Modal
                visible={visible}
                centered
                onOk={closeModal}
                onCancel={closeModal}
                footer={[
                    pageNumber === 1 ? (
                        <button key="school" type="button" className="button-transparent" onClick={() => setPageNumber(2)}>
                            Continue Without a School
                        </button>
                    ) : null,
                    pageNumber === 2 ? (
                        <Loading spinning={formLoading} key="continue" style={{ margin: 0 }}>
                            <button type="button" onClick={handleSubmit(onSubmit)} className="button-primary">
                                Continue
                            </button>
                        </Loading>
                    ) : null,
                    pageNumber === 3 ? (
                        <Loading spinning={formLoading} key="login" style={{ margin: 0 }}>
                            <Row align="middle">
                                <Col md={14} sm={24} xs={24}>
                                    <a className="forgotPassword" onClick={forgotPassword}>
                                        Forgot Password?
                                    </a>
                                </Col>
                                <Col md={10} sm={24} xs={24}>
                                    <button type="button" onClick={handleSubmit(onSubmit)} className="button-secondary">
                                        Log in
                                    </button>
                                </Col>
                            </Row>
                        </Loading>
                    ) : null,
                    pageNumber === 4 ? (
                        <Loading spinning={formLoading} key="forgetPassword" style={{ margin: 0 }}>
                            <Row align="middle">
                                <Col md={12} sm={24} xs={24}>
                                    <a className="forgotPassword" onClick={resendOTP}>
                                        Resend
                                    </a>
                                    {codeSent && <small style={{ display: 'inline-block', verticalAlign: 'top', fontSize: 14}} className="hasSuccess">Sent!</small>}
                                </Col>
                                <Col md={12} sm={24} xs={24}>
                                    <button type="button" onClick={handleSubmit(onSubmit)} className="button-secondary">
                                        Continue
                                    </button>
                                </Col>
                            </Row>
                        </Loading>
                    ) : null,
                ]}
                width={390}
                closeIcon={<CloseCircleOutlined />}
                className={`pre-register-modal signup-modal`}
            >
                <div className="modal-body-inner center">
                    <form method="post">
                        {pageNumber === 1 && (
                            <Row align="middle">
                                <Col span={12}>
                                    <h2>Log in</h2>
                                </Col>
                                <Col span={12} style={{ textAlign: 'right' }}>
                                    <img alt="Log in" src="/popup-image.svg" />
                                </Col>
                                <Col span={24} id={`modal-selection-${conntainerID}`} className={focused ? 'modal-selection-focused' : null}>
                                    <Select
                                        showSearch
                                        placeholder={!focused ? 'Select Your School' : 'Search'}
                                        className={school !== null ? 'ant-select-open-drop' : null}
                                        onChange={handleChange}
                                        onSearch={onSearch}
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        dropdownStyle={{ width: '100%', maxWidth: '342px' }}
                                        style={{ width: '100%', textAlign: 'left' }}
                                        suffixIcon={!focused ? <DropDownArrow className="ant-select-suffix" /> : <SearchIcon className="ant-select-suffix" />}
                                        listHeight={290}
                                        menuItemSelectedIcon={<CheckMarkArrow />}
                                        getPopupContainer={() => document.getElementById(`modal-selection-${conntainerID}`)}
                                    >
                                        {data?.schools && [].concat(data?.schools).sort((a, b) => a.name.localeCompare(b.name)).map((school) => {
                                            return (
                                                <Option key={school.name} value={school.name} label={school.name}>
                                                    {renderLabel(school.name)}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                    <p style={{ margin: '16px 0' }}>Or</p>
                                </Col>
                            </Row>
                        )}
                        {pageNumber === 2 && (
                            <div className="signup__wrapper">
                                <button aria-label="Back" onClick={getBack} className="back-arrow">
                                    <img alt="Back" src="/back-arrow.svg" />
                                </button>
                                <Row align="middle">
                                    <Col span={24}>
                                        <p>Email</p>
                                        <div
                                            className={classnames('inputWrapper', errors.email && 'inputWrapperError')}
                                        >
                                            <label htmlFor="email">Email Address</label>
                                            <input
                                                ref={register({
                                                    required: true && 'This field is required!',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: 'Invalid email address!',
                                                    },
                                                })}
                                                id="email"
                                                type="email"
                                                name="email"
                                                placeholder="email@example.com"
                                                onChange={handleInputChange}
                                                value={formData.email}
                                            />
                                        </div>
                                        {errors.email && <span className="hasError">{errors.email.message}</span>}
                                    </Col>
                                </Row>
                            </div>
                        )}
                        {pageNumber === 3 && (
                            <div className="signup__wrapper">
                                <button aria-label="Back" onClick={getBack} className="back-arrow">
                                    <img alt="Back" src="/back-arrow.svg" />
                                </button>
                                <Row>
                                    <Col span={24}>
                                        <p>Log in</p>
                                        <p>
                                            logging into <span style={{ color: '#894EFF' }}>{formData.email}</span>
                                        </p>
                                        <div
                                            className={classnames('inputWrapper', errors.password && 'inputWrapperError')}
                                        >
                                            <label htmlFor="password">Password</label>
                                            <div className="revealPasswordWrapper">
                                                <input
                                                    ref={register({
                                                        required: true && 'This field is required!',
                                                    })}
                                                    type={isReavalPassword ? 'text' : 'password'}
                                                    placeholder="Enter password"
                                                    id="password"
                                                    name="password"
                                                    onChange={handleInputChange}
                                                    value={formData.password}
                                                />
                                                <div className="revealPassword">
                                                    {isReavalPassword && (
                                                        <EyeOutlined
                                                            onClick={() => setIsReavalPassword(!isReavalPassword)}
                                                        />
                                                    )}
                                                    {!isReavalPassword && (
                                                        <EyeInvisibleOutlined
                                                            onClick={() => setIsReavalPassword(!isReavalPassword)}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {errors.password && <span className="hasError">{errors.password.message}</span>}
                                        {loginError && <span className="hasError" style={{ paddingTop: 16, margin: 0 }}>{loginError}</span>}
                                        {forgotPasswordError && <span className="hasError" style={{ paddingTop: 16, margin: 0 }}>{forgotPasswordError}</span>}
                                    </Col>
                                </Row>
                            </div>
                        )}
                        {pageNumber === 4 && (
                            <div className="signup__wrapper">
                                <button aria-label="Back" className="back-arrow" onClick={getBack}>
                                    <img alt="Back" src="/back-arrow.svg" />
                                </button>
                                <Row align="middle">
                                    <Col span={24}>
                                        <p>Forgot Password</p>
                                        <p>
                                            Please enter the verification code <br /> we’ve sent to{' '}
                                            <span style={{ color: '#894EFF' }}>{formData.email}</span>
                                        </p>
                                        <div
                                            className={classnames('inputWrapper', errors.code && 'inputWrapperError')}
                                        >
                                            <label htmlFor="code">Verification Code</label>
                                            <input
                                                ref={register({
                                                    required: true && 'This field is required!',
                                                    minLength: {
                                                        value: 6,
                                                        message: 'Invalid Code!',
                                                    },
                                                    maxLength: {
                                                        value: 6,
                                                        message: 'Invalid Code!',
                                                    },
                                                })}
                                                type="number"
                                                id="code"
                                                placeholder="6-digit code"
                                                name="code"
                                                onChange={handleInputChangeForgotPassword}
                                            />
                                        </div>
                                        {errors.code && (
                                            <span className="hasError" style={{ paddingBottom: 10 }}>
                                                {errors.code.message}
                                            </span>
                                        )}
                                        <div
                                            className={classnames('inputWrapper', errors.new_password && 'inputWrapperError')}
                                        >
                                            <label htmlFor="new_password">New Password</label>
                                            <input
                                                ref={register({
                                                    required: true && 'This field is required!',
                                                    pattern: {
                                                        value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                                        message:
                                                            'Password should contain min 8 letter, with at least a symbol, upper and lower case letters and a number!',
                                                    },
                                                    minLength: {
                                                        value: 8,
                                                        message:
                                                            'Password must have length greater than or equal to 8!',
                                                    },
                                                })}
                                                type="password"
                                                id="new_password"
                                                placeholder="Password"
                                                name="new_password"
                                                onChange={handleInputChangeForgotPassword}
                                            />
                                        </div>
                                        {errors.new_password && (
                                            <span className="hasError" style={{ paddingBottom: 10 }}>
                                                {errors.new_password.message}
                                            </span>
                                        )}
                                        <div
                                            className={classnames('inputWrapper', errors.confirm_password && 'inputWrapperError')}
                                        >
                                            <label htmlFor="confirm_password">Confirm Password</label>
                                            <input
                                                ref={register({
                                                    required: 'This field is required!',
                                                    validate: (value) =>
                                                        value === watch('new_password') ||
                                                        'The passwords do not match!',
                                                })}
                                                type="password"
                                                id="confirm_password"
                                                placeholder="Password"
                                                name="confirm_password"
                                            />
                                        </div>
                                        {errors.confirm_password && (
                                            <span className="hasError">{errors.confirm_password.message}</span>
                                        )}
                                        {forgotPasswordSuccess && (
                                            <span className="hasSuccess" style={{ paddingTop: 16, margin: 0 }}>{forgotPasswordSuccess}</span>
                                        )}
                                        {forgotPasswordError && <span className="hasError" style={{ paddingTop: 16, margin: 0 }}>{forgotPasswordError}</span>}
                                    </Col>
                                </Row>
                            </div>
                        )}
                    </form>
                </div>
            </Modal>
            <ModalSignUp email={email} visible={visibleSignUp} showModal={showModalSignUp} />
        </>
    );
}
