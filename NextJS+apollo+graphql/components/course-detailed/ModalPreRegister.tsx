import { CloseCircleOutlined } from '@ant-design/icons';
import { Col, Modal, Row } from 'antd';
import React, { useState } from 'react';
import { Course } from 'queries/types';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import classnames from 'classnames';
import useFocus from "../../hooks/useFocus";
import LoadingWhite from "@components/common/LoadingWhite";

interface Props {
    visible: boolean;
    showModal: (boolean) => void;
    course: Course;
}

const url = 'https://reconstruction.us17.list-manage.com/subscribe/post?u=345e9bde93ccd7eccc0a1650f&id=6d59c943c6';

export default function ModalPreRegister({ visible, showModal, course }: Props) {
    const [visibleFinal, showModalFinal] = useState(false);
    return (
        <>
            <Modal
                visible={visible}
                centered
                onOk={() => showModal(false)}
                onCancel={() => showModal(false)}
                footer={null}
                width={390}
                closeIcon={<CloseCircleOutlined />}
                className={`pre-register-modal`}
            >
                <div className="modal-body-inner center">
                    <button onClick={() => showModal(false)} aria-label="Back" className="back-arrow">
                        <img src="/back-arrow.svg" alt="Back" />
                    </button>
                    <Row>
                        <Col span={24}>
                            <p>Pre-Register</p>
                            <h3>Nice to meet you!</h3>
                            <p>Enter your email and we’ll reach out when it’s time to register.</p>
                            <MailchimpSubscribe
                                url={url}
                                render={({ subscribe, status, message }) => (
                                    <CustomForm
                                        status={status}
                                        message={message}
                                        showModal={showModal}
                                        showModalFinal={showModalFinal}
                                        course={course}
                                        onValidated={(formData) => subscribe(formData)}
                                    />
                                )}
                            />
                        </Col>
                    </Row>
                </div>
            </Modal>
            <ModalPreRegisterFinal visible={visibleFinal} showModal={showModalFinal} />
        </>
    );
}

interface PropsCustom {
    status: string;
    message: any;
    onValidated: any;
    showModal: (boolean) => void;
    showModalFinal: (boolean) => void;
    course: Course;
}

const CustomForm = ({ status, message, onValidated, showModal, course, showModalFinal }: PropsCustom) => {

    if (status === 'success') {
        showModal(false);
        showModalFinal(true);
        return null;
    }

    const ref = React.useRef<HTMLInputElement>(null);
    const focused = useFocus(ref);

    let email: string;
    const submit = (event) => {
        event.preventDefault();
        if (ref.current) {
            email = ref.current.value;
        }
        email &&
            email.indexOf('@') > -1 &&
            onValidated({
                EMAIL: email,
                COURSE: course.name,
            });
    };

    return (
        <div className={classnames('mailchimp__wrapper', focused ? 'is-focused' : null)}>
            <form onSubmit={submit}>
                <Row align="middle">
                    <Col span={24}>
                        <div className="inputWrapper">
                            <label htmlFor={`email`}>{`Email`}</label>
                            <input
                                required={true}
                                ref={ref}
                                type="email"
                                id={`email`}
                                placeholder="email@example.com"
                            />
                        </div>
                    </Col>
                    <Col span={24}>
                        {status === 'error' && <div className="response-wrapper"><div style={{ marginBottom: 24 }} dangerouslySetInnerHTML={{ __html: message }} /></div>}
                        <button type="submit" style={{ width: '100%' }} className={classnames('mailchimp-btn', 'button-secondary')}>
                            {status === 'sending' ?
                                <LoadingWhite spinning={true} />
                                : `Submit`
                            }
                        </button>
                    </Col>
                </Row>
            </form>
        </div>
    );
};

interface PropsFinal {
    visible: boolean;
    showModal: (boolean) => void;
}

const ModalPreRegisterFinal = ({ visible, showModal }: PropsFinal) => {
    return (
        <Modal
            visible={visible}
            centered
            onOk={() => showModal(false)}
            onCancel={() => showModal(false)}
            footer={[
                <button
                    type="button"
                    key="button"
                    className="button-primary"
                    style={{ width: '100%' }}
                    onClick={() => showModal(false)}
                >
                    Done
                </button>
            ]}
            width={390}
            closeIcon={<CloseCircleOutlined />}
            className={`pre-register-modal Bg-BrandTertiary`}
        >
            <div className="modal-body-inner center">
                <Row>
                    <Col span={24}>
                        <h3 style={{ marginTop: 95 }}>We’ll be in Touch!</h3>
                        <p style={{ marginBottom: 0 }}>
                            We’re just as excited as you are! <br /> Keep an eye on your inbox, we’ll be sending
                            updates.
                        </p>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};
