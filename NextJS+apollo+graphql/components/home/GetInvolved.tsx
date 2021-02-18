import { Row, Col, Typography, Card } from 'antd'
import Link from 'next/link'
import MailChimp from "@components/common/MailChimp";

const { Title } = Typography

export default function GetInvolved() {
    return (
        <div className="involved__wrapper">
            <Row>
                <Col span={24}>
                    <Title level={2}>Get Involved</Title>
                </Col>
                <Col span={24}>
                    <Row>
                        <Col md={8} sm={24} xs={24} style={{ display: "flex" }}>
                            <Card style={{ flex: 1 }} title={`Spread the Word`} bordered={false}>
                                <p>Tell your friends and family what we are up to. Encourage them to sign up. It's time, as a community, for us to Reconstruct. Give us your email and we will send you materials you can share.</p>
                                <MailChimp labelTitle={`Email Address`} btnLabel="Submit" iid="involved_email" />
                            </Card>
                        </Col>
                        <Col md={8} sm={24} xs={24} style={{ display: "flex" }}>
                            <Card style={{ flex: 1 }} title={`Join Our Team`} bordered={false}>
                                <p>We are growing fast and hiring faster. Become a tutor, write a new course, or join us at HQ. See a list of our job openings here.</p>
                                <Link href='/work-with-us'>
                                    <a className='button-primary'>View Openings</a>
                                </Link>
                            </Card>
                        </Col>
                        <Col md={8} sm={24} xs={24} style={{ display: "flex" }}>
                            <Card style={{ flex: 1 }} title={`Volunteer`} bordered={false}>
                                <p>If you volunteer to teach a course (10 hour commitment), we will provide a similar course to a young person in need of financial assistance.<br />#EachOneReachOne<br />#Reconstruct</p>
                                <Link href='/volunteer-with-us'>
                                    <a className='button-primary'>Sign Up</a>
                                </Link>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
