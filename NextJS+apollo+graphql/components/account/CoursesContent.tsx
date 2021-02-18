import { useQuery } from '@apollo/client';
import Loading from "@components/common/Loading";
import { Typography, Alert, Row, Col } from 'antd';
import CourseCard from '@components/account/CourseCard';
import useAuth from '../../hooks/useAuth';
import { MY_COURSES, MyCoursesResults } from '../../queries/account';
import { useState } from 'react';

const { Title } = Typography;

export default function ScheduleContent() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const { data } = useQuery<MyCoursesResults>(MY_COURSES, {
        onCompleted: () => {
            setLoading(false);
        },
    });
    return (
        <div className="account__main__content">
            <div className="container">
                <div className="account__main__content__inner account__courses__content__inner center">
                    <Title level={4}>My Courses</Title>
                    {user?.school.banner && <Alert message={user?.school.banner} type="error" />}
                    <Loading spinning={loading}>
                        {data?.enrollments.map(({ cohort, id }) => {
                            return <CourseCard key={id} cohort={cohort} />;
                        })}
                    </Loading>
                    {data && data?.enrollments.length === 0 && (
                        <Row>
                            <Col span={24}>
                                <Alert message="No enrolled courses!" type="error" />
                            </Col>
                        </Row>
                    )}
                </div>
            </div>
        </div>
    );
}
