import { Typography, Card, Row, Col } from 'antd';
import { useRouter } from 'next/router';
import { buildTime, buildTimeComponents } from '../../lib/helpers';
import { Cohort, Registrant } from '../../queries/types';
import { CohortGeneralInfo } from '@components/common/card';
import moment from 'moment-timezone';
import React, { useState, useEffect } from 'react';

const { Title } = Typography;

interface Props {
    cohort: Cohort;
    registrant: Registrant;
    startTime: string;
    endTime: string;
    cancelled: boolean;
}

export function ScheduleCard({ cohort, registrant, startTime, endTime, cancelled }: Props) {
    const router = useRouter();
    const mockJoin = !!router.query.mock;
    const time = buildTime(startTime, endTime);

    const date = `${moment(startTime).format('dddd, MMM. DD')}`;
    const now = moment();

    const checkIfSameDayBeforeEndTime = () => {
        if (mockJoin) return true;
        return now.isSame(moment(startTime), 'day') && now.isBefore(moment(endTime));
    };

    const checkIfSessionStart = () => {
        if (mockJoin) return true;
        return now.isBetween(moment(startTime), moment(endTime));
    };

    const [sessionStart, setSessionStart] = useState(checkIfSessionStart());

    useEffect(() => {
        const interval = setInterval(() => {
            const check = checkIfSessionStart();
            // only re-render when needed
            if ((!sessionStart && check) || (sessionStart && !check)) {
                setSessionStart(check);
            }
        }, 30000);
        return () => clearInterval(interval);
    }, [now, sessionStart, setSessionStart]);

    return (
        <Card>
            <div className="my__account__card">
                <Row align="middle">
                    <Col sm={12} xs={24}>
                        <div className="my__schedule__card__left center">
                            <Title level={4}>{sessionStart ? `Class in Session` : `${date}`}</Title>
                            <span>{time}</span>
                            {checkIfSameDayBeforeEndTime() && !cancelled && (
                                <a
                                    className="button-secondary-l with-arrow-right"
                                    href={registrant.joinUrl}
                                    target={'_blank'}
                                >
                                    Enter Session
                                    <img alt="Arrow" src="/button-arrow.svg" />
                                </a>
                            )}
                            {cancelled && (
                                <h3 style={{ fontWeight: 500, color: '#C92C69', marginTop: 44, fontSize: 20 }}>
                                    Class cancelled
                                </h3>
                            )}
                        </div>
                    </Col>
                    <Col sm={12} xs={24}>
                        <div className="my__schedule__card__right">
                            <Row align="middle">
                                <Col md={16} sm={24} xs={24}>
                                    {cohort && <CohortGeneralInfo cohort={cohort} />}
                                </Col>
                                <Col md={8} sm={24} xs={24} style={{ textAlign: 'center' }}>
                                    <img
                                        src={cohort.course.hero?.url || '/course-card-img.svg'}
                                        alt={cohort.course.name}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </Card>
    );
}
