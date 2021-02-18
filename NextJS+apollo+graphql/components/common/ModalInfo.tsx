import { useMutation } from '@apollo/client';
import { Row, Col, Modal, Button, Alert } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import useSaving from '../../hooks/useSaving';
import { ENROLL_COHORT, EnrollResult, EnrollVariables } from '../../queries/cohorts';
import { Cohort, Course, StudentEnrollment } from '../../queries/types';
import { CourseGeneralInfo } from '@components/common/card';
import { MoreInfo } from '@components/modal/more-info';
import LoadingWhite from '@components/common/LoadingWhite';
import classnames from 'classnames';
import MaskedInput from 'antd-mask-input'

interface Props {
    cohort: Cohort;
    course: Course;
    visibleInfo: boolean;
    showModalInfo: (boolean) => void;
    onEnrolled: (enrollment: StudentEnrollment) => void;
}

export default function ModalInfo({ cohort, visibleInfo, showModalInfo, onEnrolled, course }: Props) {
    const [visible, showModal] = useState(false);
    const { alert, onError, disabled, isSaving, onStart, onReset } = useSaving();
    const router = useRouter();
    const [enroll] = useMutation<EnrollResult, EnrollVariables>(ENROLL_COHORT, {
        onCompleted: useCallback(
            (data) => {
                onEnrolled(data.enroll.enrollment);
            },
            [onEnrolled],
        ),
        onError,
    });

    const onConfirmedEnrollment = useCallback(
        (cohortID) => {
            onStart();
            return enroll({
                variables: {
                    cohortId: cohortID,
                },
            });
        },
        [enroll],
    );

    function onCancel() {
        showModalInfo(false);
        onReset();
    }

    const enrollmentValidationError = alert?.code === 'rs_enroll_verification_failed';
    const alertStyles = enrollmentValidationError ? { cursor: 'pointer', } : {};

    function redirectToCourse() {
        if (enrollmentValidationError) {
            return router.push('/account/courses').then(() => window.scrollTo(0, 0));
        }
    }

    function showModalPayment() {
        onCancel();
        showModal(true);
    }

    return (
        <>
            <Modal
                visible={visibleInfo}
                centered
                onOk={onCancel}
                onCancel={onCancel}
                footer={null}
                width={390}
                closeIcon={<CloseCircleOutlined />}
                className={`pre-register-modal signup-modal`}
            >
                <Row>
                    <Col span={24}>
                        <div className="modal-body-inner">
                            <div className="signup__wrapper">
                                <button aria-label="Back" onClick={onCancel} className="back-arrow">
                                    <img alt="Back" src="/back-arrow.svg" />
                                </button>
                            </div>
                            <div className="center modal-info-inner">
                                <div className="modal-info-bg-warpper">
                                    <img alt={course.name} src={course.hero?.url || '/info-popup-image.svg'} />
                                </div>
                                <CourseGeneralInfo course={course} />
                            </div>
                        </div>
                        <MoreInfo cohort={cohort} />
                        <div className="modal-body-inner">
                            {alert && (
                                <Alert
                                    style={alertStyles}
                                    message={alert.message}
                                    type={alert.isError ? 'error' : 'info'}
                                    onClick={redirectToCourse}
                                />
                            )}
                            <Button
                                className="button-secondary-l with-arrow-right"
                                onClick={() => onConfirmedEnrollment(cohort.id)}
                                disabled={disabled}
                            >
                                {isSaving ?
                                    <LoadingWhite spinning={true} />
                                :
                                    <>
                                        Confirm Enrollment
                                        <img alt="Arrow" src="/button-arrow.svg" />
                                    </>
                                }
                            </Button>
                            {/* <Button
                                className="button-secondary-l with-arrow-right"
                                onClick={showModalPayment}
                            >
                                Continue
                                <img alt="Arrow" src="/button-arrow.svg" />
                            </Button> */}
                        </div>
                    </Col>
                </Row>
            </Modal>
            <SelectPayment visible={visible} showModal={showModal} />
        </>
    );
}

interface PropsPayment {
    visible: boolean;
    showModal: (boolean) => void;
}

const SelectPayment = ({ visible, showModal }: PropsPayment) => {
    const [visibleReplacePayment, showModalReplacePayment] = useState(false);

    function showReplacePayment() {
        showModal(false);
        showModalReplacePayment(true);
    }

    return (
        <>
            <Modal
                visible={visible}
                centered
                onOk={() => showModal(false)}
                onCancel={() => showModal(false)}
                footer={[
                    <button key="submit-payment" type="button" className="button-secondary">
                        Submit Payment
                    </button>
                ]}
                width={390}
                closeIcon={<CloseCircleOutlined />}
                className={`pre-register-modal signup-modal`}
            >
                <div className="modal-body-inner center">
                    <div className="signup__wrapper">
                        <button aria-label="Back" onClick={() => showModal(false)} className="back-arrow">
                            <img alt="Back" src="/back-arrow.svg" />
                        </button>
                        <p>Payment</p>
                        <h3>Select payment option</h3>
                        <Row>
                            <Col span={24}>
                                <Row gutter={[20, 0]}>
                                    <Col span={24}>
                                        <div className="input__radio__wrapper">
                                            <input
                                                className={`input__radio`}
                                                id={`card`}
                                                name={`card`}
                                                type={`radio`}
                                                value={`card`}
                                            />
                                            <div
                                                className={classnames('input__radio__inner')}
                                            >
                                                <label htmlFor={`card`}>Card Ending in 0123</label>
                                                <div className="check"></div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <a className="aTagBig" onClick={showReplacePayment}>
                                    Replace Payment
                                </a>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Modal>
            <ReplacePayment visible={visibleReplacePayment} showModal={showModalReplacePayment} />
        </>
    );
}

const ReplacePayment = ({ visible, showModal }: PropsPayment) => {
    return (
        <Modal
            visible={visible}
            centered
            onOk={() => showModal(false)}
            onCancel={() => showModal(false)}
            footer={[
                <button key="add-payment" type="button" className="button-secondary">
                    Add Payment Option
                </button>
            ]}
            width={390}
            closeIcon={<CloseCircleOutlined />}
            className={`pre-register-modal signup-modal`}
        >
            <div className="modal-body-inner center">
                <div className="signup__wrapper">
                    <button aria-label="Back" onClick={() => showModal(false)} className="back-arrow">
                        <img alt="Back" src="/back-arrow.svg" />
                    </button>
                    <p>Add Payment</p>
                    <Row>
                        <Col span={24}>
                            <div
                                className={classnames('inputWrapper')}
                            >
                                <label htmlFor="cardName">Name on Card</label>
                                <input
                                    type="text"
                                    id={`cardName`}
                                    name={`cardName`}
                                    placeholder={`First Last`}
                                />
                            </div>
                            <div
                                className={classnames('inputWrapper')}
                            >
                                <label htmlFor="cardNumber">Credit / Debit Card Number</label>
                                <MaskedInput
                                    mask="1111 1111 1111 1111"
                                    placeholder="•••• •••• •••• ••••"
                                    name="cardNumber"
                                    id="cardNumber"
                                />
                            </div>
                            <Row gutter={[16, 0]}>
                                <Col sm={12} xs={24}>
                                    <div
                                        className={classnames('inputWrapper', 'inputWrapperMultiCol')}
                                    >
                                        <label htmlFor={`expDate`}>EXP Date</label>
                                        <MaskedInput
                                            mask="11/11"
                                            placeholder="MM/YY"
                                            name="expDate"
                                            id="expDate"
                                        />
                                    </div>
                                </Col>
                                <Col sm={12} xs={24}>
                                    <div
                                        className={classnames('inputWrapper')}
                                    >
                                        <label htmlFor={`cvc`}>CVC</label>
                                        <MaskedInput
                                            mask="111"
                                            placeholder="•••"
                                            name="cvc"
                                            id="cvc"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <div
                                className={classnames('inputWrapper')}
                                style={{ marginTop: 16 }}
                            >
                                <label htmlFor="zipCode">Zip Code</label>
                                <MaskedInput
                                    mask="11111"
                                    placeholder="01234"
                                    name="zipCode"
                                    id="zipCode"
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Modal>
    );
}
