import { Card, Row, Col } from 'antd'
import ModalPreRegister from '@components/course-detailed/ModalPreRegister';
import React, { useState } from 'react';
import { Course } from '../../queries/types';

interface Props {
    course: Course;
}

export default function PreRegister({ course }: Props) {
    const [visible, showModal] = useState(false);

    return (
        <div className="pre-register">
            <Card bordered={false}>
                <Row align="middle">
                    <Col sm={15} xs={24}><p>All Classes are currently full. Pre-Register to be notified when more are added!</p></Col>
                    <Col sm={9} xs={24}><button onClick={() => showModal(true)} className="button-secondary" style={{ width: '100%' }}>Pre-register</button></Col>
                </Row>
            </Card>
            <ModalPreRegister course={course} visible={visible} showModal={showModal} />
        </div>
    )
}
