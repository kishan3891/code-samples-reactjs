import { Row, Col, Typography } from 'antd'

const { Title } = Typography

export default function Hero() {
    return (
        <div className='hero__wrapper hero__wrapper__inner hero__wrapper__about'>
            <div className='container'>
                <div className='hero__wrapper__content center'>
                    <Row>
                        <Col span={24}>
                            <Title level={1}>Personal, world-class education at home</Title>
                            <img alt='Personal, world-class education at home' src='/about-banner.png' />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
