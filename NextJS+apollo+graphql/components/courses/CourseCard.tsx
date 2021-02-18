import { Card, Row, Col } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Course } from '../../queries/types';
import { CourseGeneralInfo } from '@components/common/card';

export interface CoursesProps {
    course: Course;
}

export default function CourseCard({ course }: CoursesProps) {
    const router = useRouter();
    const handleClick = (href) => {
        router.push('/course/[slug]', href).then(() => window.scrollTo(0, 0));
    };
    const slug = '/course/' + course.slug;

    return (
        <Card
            onClick={(e) => {
                e.preventDefault();
                handleClick(slug);
            }}
        >
            <div className="class__schedule__header">
                <Row>
                    <Col span={24}>
                        <CourseGeneralInfo course={course} />
                    </Col>
                    {/* <Col xl={8} lg={24} md={24} sm={24} xs={24} className="center image__wrapper">
                        <img src="/course-card-img.png" alt="Reconstruction Foundation" />
                    </Col> */}
                </Row>
            </div>
            <div className="class__schedule__body">
                <div className="ant-card-meta-description">
                    <p>{course.headline}</p>
                </div>
                <Link href="/course/[slug]" as={slug} >
                    <a className="button-primary-l with-arrow-right" onClick={(e) => e.stopPropagation()}>
                        Learn More <img alt="Arrow" src="/button-arrow.svg" />
                    </a>
                </Link>
            </div>
        </Card>
    );
}
