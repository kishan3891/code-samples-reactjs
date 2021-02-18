import { CourseGeneralInfo } from '@components/common/card';
import { Col, Row } from 'antd';
import * as Scroll from 'react-scroll';
import { Course, FrequencyType } from '../../queries/types';

let Link = Scroll.Link;

interface Props {
    course: Course;
}

export default function Hero({ course }: Props) {
    const once = course.frequencyType === FrequencyType.WEEKLY;
    const weeks = Math.floor(course.totalClasses / (once ? 1 : 2));
    return (
        <div className="hero__wrapper hero__wrapper__inner">
            <div className="container">
                <Row align="middle" gutter={[10, 0]}>
                    <Col md={10} sm={24} xs={24} className="hero__course__detailed__left">
                        <CourseGeneralInfo course={course} />
                        <div className="hero__button__wrapper">
                            <Link
                                to="classSchedule"
                                spy={true}
                                smooth={true}
                                offset={-150}
                                duration={500}
                                className="button-primary-xl with-arrow-bottom"
                            >
                                Find a Class
                                <img alt="Arrow" src="/down-arrow.svg" />
                            </Link>
                            <strong>
                                {`${weeks} week${weeks > 1 ? 's' : ''}`},{' '}
                                {once ? '1 class a  week' : '2 classes each week'}.
                            </strong>
                        </div>
                    </Col>
                    <Col md={14} sm={24} xs={24} className="hero__course__detailed__right">
                        <img alt={course.name} src={course.hero?.url || '/course-detailed-image.svg'} />
                    </Col>
                </Row>
            </div>
        </div>
    );
}
