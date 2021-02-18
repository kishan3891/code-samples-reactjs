import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row } from 'antd';
import { useRouter } from 'next/router';
import { StudentEnrollment } from '../../queries/types';
import { CohortGeneralInfo } from '@components/common/card';

interface Props {
    visible: boolean;
    showModal: (boolean) => void;
    enrollment?: StudentEnrollment;
}

export default function ModalSchedule({ visible, showModal, enrollment }: Props) {
    const router = useRouter();

    function handleClick() {
        router.push(`/account/schedule?enrollment=${id}`).then(() => window.scrollTo(0, 0));
    }

    const { student, course, id } = enrollment || {};

    return (
        <Modal
            visible={visible}
            centered
            onOk={() => showModal(false)}
            onCancel={() => showModal(false)}
            footer={[
                <Button key="button" className="button-primary-l with-arrow-right" onClick={handleClick}>
                    View Schedule
                    <img alt="Arrow" src="/button-arrow.svg" />
                </Button>,
            ]}
            width={390}
            closeIcon={<CloseCircleOutlined />}
            className="Bg-BrandTertiary"
            destroyOnClose={true}
        >
            <div className="modal-body-inner center">
                <Row>
                    <Col span={24}>
                        <h3>You are Enrolled!</h3>
                        <p>Provided by {student?.school.name}</p>
                        <div className="center modal-info-inner modal-info-white-text">
                            {course && <CohortGeneralInfo cohort={{ course }} />}
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
}
