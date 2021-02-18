import { Typography, Card, Avatar, Row, Col, Button } from 'antd';
import React, { MutableRefObject, RefCallback } from 'react';
import S from 'string';
import { Cohort } from '../../queries/types';
import { parseCohortTimeComponents } from '../../lib/helpers';

const { Title } = Typography;
const { Meta } = Card;

interface Props {
    cohort: Cohort;
    onEnrollClicked: (cohort: Cohort) => void;
    innerRef?: RefCallback<HTMLDivElement>;
}

export default function CourseDetailedCard({ cohort, onEnrollClicked, innerRef }: Props) {
    const comps = parseCohortTimeComponents(cohort);
    const instructorName = cohort.instructor
        ? cohort.instructor.firstName + ' ' + S(cohort.instructor.lastName).left(1).s + '.'
        : 'TBD';
    /// use `error` to display any errors
    return (
        <Card style={{ flex: 1 }}>
            <div className="class__schedule__header" ref={innerRef}>
                <Title level={4}>{comps.date}</Title>
                {comps.occurrences.map((occ, index) => {
                    return (
                        <Row justify="space-between" align="middle" key={`occ_${index}`}>
                            <Col lg={10} md={24} sm={24} xs={24}>
                                <span>{occ.day}</span>
                            </Col>
                            <Col lg={14} md={24} sm={24} xs={24} style={{ textAlign: 'right' }}>
                                <span>{occ.time}</span>
                            </Col>
                        </Row>
                    );
                })}
            </div>
            <div className="class__schedule__body center">
                <Meta
                    avatar={<Avatar src={cohort.instructor?.avatar?.url || '/avatar.png'} />}
                    title={instructorName}
                    description="Instructor"
                />
                <Button
                    type="primary"
                    className="button-primary-l with-arrow-right"
                    onClick={() => onEnrollClicked(cohort)}
                >
                    Enroll Now <img alt="Arrow" src="/button-arrow.svg" />
                </Button>
                <p>
                    <strong>{cohort.seatsAvailable} seats </strong>remaining
                </p>
            </div>
        </Card>
    );
}
