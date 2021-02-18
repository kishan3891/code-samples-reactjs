import { Row, Col, Typography, Card } from 'antd'

const { Title } = Typography

export default function HowItWorks() {
    return (
        <Row className='reconstruction-work'>
            <Col lg={12} md={12} sm={24} xs={24}>
                <div className='reconstruction-sticky-sidebar-wrapper'>
                    <div className='reconstruction-sticky-sidebar'>
                        <Title level={2}>What is<br />Reconstruction?</Title>
                        <img alt='What is Reconstruction?' src='/Homepage-How-does-R-work-min.png' />
                    </div>
                </div>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
                <Card title='1' bordered={false}>
                    <Title level={3}>One-of-a-Kind, World-Class Curriculum</Title>
                    <p>Designed by diverse educators, for diverse students, our curriculum highlights Black people, Black culture, and Black contributions to our country and our world.</p>
                </Card>
                <Card title='2' bordered={false}>
                    <Title level={3}>Small Online Groups</Title>
                    <p>Live sessions led by outstanding young professionals, content specialists, artists, and other charismatic leaders.</p>
                </Card>
                <Card title='3' bordered={false}>
                    <Title level={3}>Teaching Neglected Topics</Title>
                    <p>Our mission is to help students see history and education in a broader context that resonates with their culture and identity. More James Baldwin than James Joyce. More Toni Morrison than William Faulkner.</p>
                </Card>
                <Card title='4' bordered={false}>
                    <Title level={3}>High Quality and Affordable</Title>
                    <p>Reconstruction pairs lessons from the best, and most diverse, curriculum writers in America with outstanding instructors, at a price that is <b>80% less than leading tutoring services.</b></p>
                </Card>
            </Col>
        </Row>
    )
}
