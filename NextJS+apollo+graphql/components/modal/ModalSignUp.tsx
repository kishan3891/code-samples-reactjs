import { CloseCircleOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Col, Modal, Row, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { CheckMarkArrow } from "@components/icons/check-mark";
import useWindowDimensions from '../../hooks/windowSize';
import { DropDownArrow } from "@components/icons/drop-down-arrow";
import { Auth } from "aws-amplify";
import { useForm } from 'react-hook-form';
import { GetCourseOptionsResults, GET_COURSE_OPTIONS } from 'queries/courses';
import { useQuery } from '@apollo/client';
import MaskedInput from 'antd-mask-input'
import Loading from '@components/common/Loading';
import classnames from 'classnames';

const { Option } = Select;

interface Props {
    email: string;
    visible: boolean;
    showModal: (boolean) => void;
}

export default function ModalSignUp({ visible, showModal, email }: Props) {
    const windowDimensions = useWindowDimensions();
    const [grades, setGrades] = useState([]);
    const { data: courseOptions } = useQuery<GetCourseOptionsResults>(GET_COURSE_OPTIONS, {
        onCompleted: () => {
            setGrades(courseOptions.grades);
        },
    });
    const [isReavalPassword, setIsReavalPassword] = useState(false);
    const defaultValues1 = {
        i_am: '',
        fullName: '',
        password: '',
    };
    const [signupFormData1, setSignupFormData1] = useState(defaultValues1);
    const defaultValues2 = {
        studentName: '',
        gender: null,
        grade: null,
        dob: ''
    };
    const [signupFormData2, setSignupFormData2] = useState(defaultValues2);
    const [pageNumber, setPageNumber] = useState(1);
    const [signupError, setSignupError] = useState(null);
    const [signupSuccess, setSignupSuccess] = useState(null);
    const [formLoading, setLoadingState] = useState(false);
    const { register, handleSubmit, errors } = useForm({
        reValidateMode: 'onSubmit',
    }); // initialize the hook
    const {
        register: register2,
        errors: errors2,
        handleSubmit: handleSubmit2,
        setValue
    } = useForm({
        reValidateMode: "onSubmit"
    });

    const onSubmit = async (values) => {
        setPageNumber(2);
    };

    const onSubmit2 = async (values) => {
        setSignupError(null);
        setSignupSuccess(null);
        setLoadingState(true);

        const sigunUpParam = {
            username: email,
            password: signupFormData1.password,
            attributes: {
                email: email,
                family_name: signupFormData1.fullName,
                given_name: signupFormData2.studentName,
                birthdate: signupFormData2.dob,
                gender: signupFormData2.gender,
                'custom:grade': signupFormData2.grade,
                'custom:role': signupFormData1.i_am,
            },
        };

        await Auth.signUp(sigunUpParam).then((data) => {
            console.log(data);
            setSignupSuccess(`Please confirm your email and then login.`);
            setTimeout(() => {
                closeModal();
            }, 3000);
        }).catch((error) => {
            console.log(error);
            setSignupError(error.message);
        });
        setLoadingState(false);
    };

    const handleInputChange1 = (evt) => {
        const value = evt.target.value;
        setSignupFormData1({
            ...signupFormData1,
            [evt.target.name]: value,
        });
    };

    const handleInputChange2 = (evt) => {
        const value = evt.target.value;
        if (evt.target.name === 'dob') setValue('dob', value);
        setSignupFormData2({
            ...signupFormData2,
            [evt.target.name]: value,
        });
    };

    const handleSelectChange = (e, d) => {
        const value = e;
        const { label } = d;
        if (label === 'gender') setValue('gender', value);
        else setValue('grade', value);
        setSignupFormData2({
            ...signupFormData2,
            [label]: value,
        });
    };

    function closeModal() {
        showModal(false);
        setPageNumber(1);
        setSignupFormData1(defaultValues1);
        setSignupFormData2(defaultValues2);
    }

    useEffect(() => {
        register2(
            { name: `dob` },
            {
                required: true && 'This field is required!',
                pattern: {
                    value: /^\d{2}\/\d{2}\/\d{4}$/,
                    message: 'Invalid date format!',
                },
            },
        );
        register2({ name: `gender` }, { required: true && 'This field is required!' });
        register2({ name: `grade` }, { required: true && 'This field is required!' });
    }, [register2]);

    return (
        <Modal
            visible={visible}
            centered
            onOk={() => closeModal()}
            onCancel={() => closeModal()}
            footer={[
                pageNumber === 1 ? (
                    <button key="continue" type="button" onClick={handleSubmit(onSubmit)} className="button-secondary">
                        Continue
                    </button>
                ) : null,
                pageNumber === 2 ? (
                    <Loading spinning={formLoading} key="create-account" style={{ margin: 0 }}>
                        <button
                            key="create-account"
                            type="button"
                            onClick={handleSubmit2(onSubmit2)}
                            className="button-secondary"
                        >
                            {signupFormData1.i_am === 'parent' ? `Add Student` : `Continue`}
                        </button>
                    </Loading>
                ) : null,
            ]}
            width={390}
            closeIcon={<CloseCircleOutlined />}
            className={`pre-register-modal signup-modal`}
        >
            <div className="modal-body-inner center">
                {pageNumber === 1 && (
                    <form method="post" key={1}>
                        <div className="signup__wrapper">
                            <button type="button" onClick={() => closeModal()} aria-label="Back" className="back-arrow">
                                <img src="/back-arrow.svg" alt="Back" />
                            </button>
                            <p>Sign Up</p>
                            <span className="small">I am a</span>
                            <Row>
                                <Col span={24}>
                                    <Row gutter={[20, 0]}>
                                        <Col sm={12} xs={24}>
                                            <div className="input__radio__wrapper">
                                                <input
                                                    ref={register({
                                                        required: true && 'This field is required!',
                                                    })}
                                                    className={`input__radio`}
                                                    id={`student`}
                                                    name={`i_am`}
                                                    type={`radio`}
                                                    value={`student`}
                                                    onChange={handleInputChange1}
                                                    checked={signupFormData1.i_am === `student`}
                                                />
                                                <div
                                                    className={classnames('input__radio__inner', errors.i_am && 'inputWrapperError')}
                                                >
                                                    <label htmlFor={`student`}>Student</label>
                                                    <div className="check"></div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm={12} xs={24}>
                                            <div className="input__radio__wrapper">
                                                <input
                                                    ref={register({
                                                        required: true && 'This field is required!',
                                                    })}
                                                    className={`input__radio`}
                                                    id={`parent`}
                                                    name={`i_am`}
                                                    type={`radio`}
                                                    value={`parent`}
                                                    onChange={handleInputChange1}
                                                    checked={signupFormData1.i_am === `parent`}
                                                />
                                                <div
                                                    className={classnames('input__radio__inner', errors.i_am && 'inputWrapperError')}
                                                >
                                                    <label htmlFor={`parent`}>Parent</label>
                                                    <div className="check"></div>
                                                </div>
                                            </div>
                                        </Col>
                                        {errors.i_am && (
                                            <Col span={24}>
                                                <span className="hasError radioError" style={{ paddingBottom: 10 }}>
                                                    {errors.i_am.message}
                                                </span>
                                            </Col>
                                        )}
                                    </Row>
                                </Col>
                                <Col span={24}>
                                    <div
                                        className={classnames('inputWrapper', errors.fullName && 'inputWrapperError')}
                                    >
                                        <label htmlFor="fullName">Full Name</label>
                                        <input
                                            ref={register({
                                                required: true && 'This field is required!',
                                            })}
                                            type="text"
                                            id={`fullName`}
                                            name={`fullName`}
                                            placeholder={`First Last`}
                                            onChange={handleInputChange1}
                                            value={signupFormData1.fullName}
                                        />
                                    </div>
                                    {errors.fullName && (
                                        <span className="hasError" style={{ paddingBottom: 10 }}>
                                            {errors.fullName.message}
                                        </span>
                                    )}
                                    <div
                                        className={classnames('inputWrapper', errors.password && 'inputWrapperError')}
                                    >
                                        <label htmlFor={`password`}>Create a Password</label>
                                        <div className="revealPasswordWrapper">
                                            <input
                                                ref={register({
                                                    required: true && 'You must specify a password!',
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
                                                type={isReavalPassword ? 'text' : 'password'}
                                                id={`password`}
                                                name={`password`}
                                                placeholder="Enter Password"
                                                onChange={handleInputChange1}
                                                value={signupFormData1.password}
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
                                </Col>
                            </Row>
                        </div>
                    </form>
                )}
                {pageNumber === 2 && (
                    <form method="post" key={2}>
                        <div className="signup__wrapper" id="signup__wrapper">
                            <button
                                onClick={() => setPageNumber(pageNumber - 1)}
                                aria-label="Back"
                                className="back-arrow"
                            >
                                <img src="/back-arrow.svg" alt="Back" />
                            </button>
                            <p>Student Info</p>
                            <Row>
                                {signupFormData1.i_am === 'parent' && (
                                    <Col span={24}>
                                        <h3>Let’s Add a Student</h3>
                                    </Col>
                                )}
                                <Col span={24}>
                                    {signupFormData1.i_am === 'parent' && (
                                        <>
                                            <div
                                                className={classnames('inputWrapper', errors2.studentName && 'inputWrapperError')}
                                            >
                                                <label htmlFor={`studentName`}>Student Name</label>
                                                <input
                                                    ref={register2({
                                                        required: true && 'This field is required!',
                                                    })}
                                                    type="text"
                                                    id={`studentName`}
                                                    name="studentName"
                                                    placeholder="First Last"
                                                    onChange={handleInputChange2}
                                                    value={signupFormData2.studentName}
                                                />
                                            </div>
                                            {errors2.studentName && (
                                                <span className="hasError" style={{ paddingBottom: 10 }}>
                                                    {errors2.studentName.message}
                                                </span>
                                            )}
                                        </>
                                    )}
                                    <div
                                        className={classnames('inputWrapper', errors2.gender && 'inputWrapperError')}
                                    >
                                        <label htmlFor={`gender`}>Gender</label>
                                        <Select
                                            placeholder={`Select One`}
                                            value={signupFormData2.gender}
                                            onChange={handleSelectChange}
                                            dropdownStyle={{ width: '100%', maxWidth: '300px' }}
                                            style={{ width: '100%' }}
                                            suffixIcon={<DropDownArrow className="ant-select-suffix" />}
                                            listHeight={300}
                                            menuItemSelectedIcon={<CheckMarkArrow />}
                                            dropdownMatchSelectWidth={windowDimensions.width <= 767}
                                            getPopupContainer={() => document.getElementById('signup__wrapper')}
                                            id="gender"
                                            ref={(e) =>
                                                register({
                                                    name: 'gender',
                                                })
                                            }
                                        >
                                            <Option value={`Male`} label="gender">
                                                Male
                                            </Option>
                                            <Option value={`Female`} label="gender">
                                                Female
                                            </Option>
                                        </Select>
                                    </div>
                                    {errors2.gender && (
                                        <span className="hasError" style={{ paddingBottom: 10 }}>
                                            {errors2.gender.message}
                                        </span>
                                    )}
                                    <Row gutter={[16, 0]}>
                                        <Col sm={12} xs={24}>
                                            <div
                                                className={classnames('inputWrapper', 'inputWrapperMultiCol', errors2.dob && 'inputWrapperError')}
                                            >
                                                <label htmlFor={`dob`}>Date of Birth</label>
                                                <MaskedInput
                                                    mask="11/11/1111"
                                                    placeholder="MM/DD/YYYY"
                                                    onChange={handleInputChange2}
                                                    name="dob"
                                                    id="dob"
                                                    defaultValue={signupFormData2.dob}
                                                />
                                            </div>
                                            {errors2.dob && <span className="hasError hasErrorDOB">{errors2.dob.message}</span>}
                                        </Col>
                                        <Col sm={12} xs={24}>
                                            <div
                                                className={classnames('inputWrapper', errors2.grade && 'inputWrapperError')}
                                            >
                                                <label htmlFor={`grade`}>Grade Level</label>
                                                <Select
                                                    placeholder={`Select One`}
                                                    value={signupFormData2.grade}
                                                    onChange={handleSelectChange}
                                                    dropdownStyle={{ width: '100%', maxWidth: '180px' }}
                                                    style={{ width: '100%' }}
                                                    suffixIcon={<DropDownArrow className="ant-select-suffix" />}
                                                    listHeight={300}
                                                    menuItemSelectedIcon={<CheckMarkArrow />}
                                                    dropdownMatchSelectWidth={windowDimensions.width <= 767}
                                                    getPopupContainer={() => document.getElementById('signup__wrapper')}
                                                    id="grade"
                                                    ref={(e) =>
                                                        register({
                                                            name: 'grade',
                                                        })
                                                    }
                                                >
                                                    {grades.map((opt) => (
                                                        <Option value={opt.name} key={opt.id} label="grade">
                                                            {opt.name}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </div>
                                            {errors2.grade && <span className="hasError">{errors2.grade.message}</span>}
                                        </Col>
                                        {signupError && (
                                            <Col span={24}>
                                                <span className="hasError" style={{ paddingTop: 16, margin: 0 }}>
                                                    {signupError}
                                                </span>
                                            </Col>
                                        )}
                                        {signupSuccess && (
                                            <Col span={24}>
                                                <span className="hasSuccess" style={{ paddingTop: 16, margin: 0 }}>
                                                    {signupSuccess}
                                                </span>
                                            </Col>
                                        )}
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
}
