import { Row, Col, Typography } from 'antd'

const { Title } = Typography

interface Props {
    description: string;
}

export default function WhatsBeingTaught ({ description }: Props) {
    return (
        <div className="container">
            <div className="WhatsBeingTaught__wrapper center">
                <Row align="middle">
                    <Col span={24}>
                        <Title level={2}>What’s <br /> Being Taught</Title>
                        <p>{description}</p>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
