import { Card, Row, Col } from 'antd'
import { Cohort } from '../../queries/types';
import { CohortGeneralInfo } from '@components/common/card';
import { MoreInfo } from '@components/modal/more-info';

interface Props {
    cohort: Cohort;
}

export default function CourseCard({ cohort }:Props) {
    return (
        <Card>
            <div className='my__account__card'>
                <Row>
                    <Col span={24} className="center">
                        <CohortGeneralInfo cohort={cohort}  />
                    </Col>
                </Row>
                <MoreInfo cohort={cohort} />
            </div>
        </Card>
    )
}
