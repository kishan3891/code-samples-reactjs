import { Row, Col } from 'antd';
import { parseCohortTimeComponents } from '../../lib/helpers';
import { Cohort } from '../../queries/types';

interface MoreInfoProps {
    cohort: Cohort;
}

export function MoreInfo({ cohort }: MoreInfoProps) {
    const comps = parseCohortTimeComponents(cohort);
    return (
        <>
            <div className="modal-info-more">
                <Row align="middle" gutter={[48, 0]}>
                    <Col span={24}>
                        <div className="modal-info-col">
                            <Row justify="space-between">
                                <Col span={12} style={{ textAlign: 'left' }}>
                                    Student(s)
                                </Col>
                                <Col span={12} style={{ textAlign: 'right' }}>
                                    <span>Devin Robertson</span>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="modal-info-col">
                            <Row justify="space-between">
                                <Col span={12} style={{ textAlign: 'left' }}>
                                    Dates
                                </Col>
                                <Col span={12} style={{ textAlign: 'right' }}>
                                    <span>{comps.date}</span>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    {comps.occurrences.map((occ, index) => {
                        return (
                            <Col span={24} key={`occ_${cohort.id}_${index}`}>
                                <div className="modal-info-col">
                                    <Row justify="space-between">
                                        <Col span={11} style={{ textAlign: 'left' }}>
                                            {occ.day}
                                        </Col>
                                        <Col span={13} style={{ textAlign: 'right' }}>
                                            <span>{occ.time}</span>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </div>
            <div className="modal-total">
                <Row align="middle" gutter={[48, 0]}>
                    <Col span={24}>
                        <div className="modal-info-col" style={{ padding: '16px 24px 0' }}>
                            <Row justify="space-between">
                                <Col span={12} style={{ textAlign: 'left' }}>
                                    <strong>Total</strong>
                                </Col>
                                <Col span={12} style={{ textAlign: 'right' }}>
                                    <strong>$450</strong>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}
