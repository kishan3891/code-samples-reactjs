import { Card, Typography } from 'antd';
import parse from 'html-react-parser';
import { Cohort, Course } from '../../queries/types';

const { Title } = Typography;

interface ReconstructionCardProps {
    title: string;
    description: string;
}

export function ReconstructionCard({ title, description }: ReconstructionCardProps) {
    return (
        <Card style={{ flex: 1 }} title={parse(title)} bordered={false}>
            {parse(description)}
        </Card>
    );
}

interface CohortGeneralInfoProps {
    cohort: Pick<Cohort, 'course'>;
}

export function CohortGeneralInfo({ cohort }: CohortGeneralInfoProps) {
    return (
        <>
            <span>{cohort.course.subject.name.toUpperCase()}</span>
            <Title level={4}>{cohort.course.name}</Title>
            <span className="grade">{cohort.course.academic}</span>
        </>
    );
}

interface CourseGeneralInfoProps {
    course: Course;
}

export function CourseGeneralInfo({ course }: CourseGeneralInfoProps) {
    return (
        <>
            <span>{course.subject.name}</span>
            <Title level={4}>{course.name}</Title>
            <span className="grade">{course.academic}</span>
        </>
    );
}
