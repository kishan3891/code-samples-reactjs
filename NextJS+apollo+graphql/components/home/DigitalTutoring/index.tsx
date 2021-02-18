import { Row, Col, Typography } from 'antd'
import CardContent from './CardContent'

const { Title } = Typography

export default function DigitalTutoring() {
    return (
        <div className="site-card-wrapper">
            <div className="site-card-inner-content">
                <Row align="middle">
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <Title level={2}>Online classes with teachers who get it</Title>
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <p>
                            Our classes are held remotely via our online platform, with real instructors leading groups
                            of six students at a time.
                            <br />
                            <br />
                            Traditional education struggles to discuss Black contributions to American and world history
                            in an accurate, identity-affirming way. We’re here to help all students see themselves
                            differently -- in school and in life.
                        </p>
                    </Col>
                </Row>
            </div>
            <Row>
                <Col lg={8} md={8} sm={24} xs={24}>
                    <CardContent
                        imageSrc="/Home_Elementary@2x-min.jpg"
                        title="Shorties"
                        description="5-10"
                        href='/curriculum/shorties'
                        longDescription="<p><b>The Come Up</b><br><br>“A people without knowledge of their past history, origin and culture is like a tree without roots.” - Marcus Garvey</p>"
                    />
                </Col>
                <Col lg={8} md={8} sm={24} xs={24}>
                    <CardContent
                        imageSrc="/Home_Middle@2x-min.jpg"
                        title="Youngins"
                        description="11-13"
                        href='/curriculum/youngins'
                        longDescription="<p><b>The Warm Up</b><br><br>“If you know from whence you came, there are absolutely no limitations to where you can go.” - James Baldwin</p>"
                    />
                </Col>
                <Col lg={8} md={8} sm={24} xs={24}>
                    <CardContent
                        imageSrc="/Home_High@2x-min.jpg"
                        title="Gen Z"
                        description="14-18"
                        href='/curriculum/genz'
                        longDescription="<p><b>The Glow Up</b><br><br>“To know how much there is to know is the beginning of learning to live.” - Dorothy West</p>"
                    />
                </Col>
            </Row>
        </div>
    );
}
