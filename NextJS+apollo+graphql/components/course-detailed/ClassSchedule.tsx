import ModalInfo from '@components/common/ModalInfo';
import ModalLogin from '@components/common/ModalLogin';
import ModalSchedule from '@components/common/ModalSchedule';
import CourseDetailedCard from '@components/course-detailed/CourseDetailedCard';
import PreRegister from '@components/course-detailed/pre-register';
import { Col, Row, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Element } from 'react-scroll';
import scrollIntoView from 'scroll-into-view-if-needed';
import useAuth from '../../hooks/useAuth';
import { Cohort, Course, StudentEnrollment } from '../../queries/types';

const { Title } = Typography;

interface Props {
    course: Course;
    refetch: (boolean) => void;
}

export default function ClassSchedule({ course, refetch }: Props) {
    const [visible, showModal] = useState(false);
    const [visibleModalSchedule, showModalModalSchedule] = useState(false);
    const [visibleInfo, showModalInfo] = useState(false);
    const [selectedCohort, setSelectedCohort] = useState<Cohort | undefined>();
    const [enrollment, onEnrolled] = useState<StudentEnrollment | undefined>();
    const [cohortRestored, setCohortRestored] = useState(false);

    const router = useRouter();
    const { user } = useAuth();

    const onEnrollClicked = (cohort) => {
        if (user) {
            setSelectedCohort(cohort);
            showModalInfo(true);
        } else {
            setSelectedCohort(cohort);
            showModal(true);
        }
    };

    const onEnrolledInternal = useCallback(
        (enrollment: StudentEnrollment) => {
            onEnrolled(enrollment);
            showModalInfo(false);
            setSelectedCohort(undefined);
            showModalModalSchedule(true);
            refetch(true);
        },
        [refetch, onEnrolled, showModalInfo, showModalModalSchedule],
    );

    const onCohortRefChanged = useCallback(
        (e: HTMLDivElement) => {
            if (e && !cohortRestored) {
                setCohortRestored(true);
                scrollIntoView(e, {
                    behavior: 'smooth',
                });
            }
        },
        [cohortRestored, setCohortRestored],
    );

    useEffect(() => {
        const cohortId = router.query.cohortId as string;
        if (!enrollment && !selectedCohort && course && user && cohortId) {
            const cohort = course.cohorts.find((c) => c.id === cohortId);
            onEnrollClicked(cohort);
        }
    }, [user, router, course, selectedCohort, enrollment]);

    return (
        <div className="container">
            <Element name="classSchedule">
                <div className="class__schedule__wrapper">
                    <Row>
                        <Col span={24}>
                            <div className="class__schedule__title__wrapper center">
                                <Title level={2}>Current Class Schedule</Title>
                            </div>
                        </Col>
                        {course.cohorts && course.cohorts.length > 0 ? (
                            <>
                                <Col span={24}>
                                    <Row gutter={[32, 32]}>
                                        {course.cohorts
                                            .filter((cohort) => cohort.seatsAvailable > 0)
                                            .map((cohort) => (
                                                <Col md={8} sm={12} xs={24} key={cohort.id} style={{ display: 'flex' }}>
                                                    <CourseDetailedCard
                                                        innerRef={
                                                            selectedCohort?.id === cohort.id ? onCohortRefChanged : null
                                                        }
                                                        cohort={cohort}
                                                        onEnrollClicked={onEnrollClicked}
                                                    />
                                                </Col>
                                            ))}
                                    </Row>
                                </Col>
                                {user && selectedCohort && (
                                    <ModalInfo
                                        course={course}
                                        cohort={selectedCohort}
                                        visibleInfo={visibleInfo}
                                        showModalInfo={showModalInfo}
                                        onEnrolled={onEnrolledInternal}
                                    />
                                )}
                                <ModalLogin
                                    visible={visible}
                                    state={{ cohortId: selectedCohort?.id }}
                                    showModal={showModal}
                                    conntainerID={2}
                                />
                            </>
                        ) : (
                            <Col span={24}>
                                <PreRegister course={course} />
                            </Col>
                        )}
                        <ModalSchedule
                            enrollment={enrollment}
                            visible={visibleModalSchedule}
                            showModal={showModalModalSchedule}
                        />
                    </Row>
                    {/* <div className='class__schedule__cta'>
                        <Row>
                            <Col span={24}>
                                <div className='class__schedule__cta__inner'>
                                    <Row align='middle'>
                                        <Col lg={16} md={16} sm={24} xs={24}>
                                            <p>Don’t see a class that works for you?</p>
                                        </Col>
                                        <Col lg={8} md={8} sm={24} xs={24} style={{ textAlign: 'right' }}>
                                            <Link href='/'>
                                                <a className='button-tertiary'>Notify Me</a>
                                            </Link>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div> */}
                </div>
            </Element>
        </div>
    );
}
