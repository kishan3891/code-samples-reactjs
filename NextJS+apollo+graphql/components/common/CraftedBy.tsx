import { Row, Col, Typography } from 'antd'
import '../../assets/css/modules/_craftedby.less'

const { Title } = Typography

export default function CraftedBy() {
    return (
        <div className='container'>
            <div className='crafted__by__wrapper'>
                <Row align='middle'>
                    <Col sm={17} xs={24}>
                        <div className='crafted__by__title__wrapper center'>
                            <Title level={4}>Platform technology <br />custom crafted by <a href='https://utilitynyc.com/' target='_blank'>Utility</a></Title>
                        </div>
                    </Col>
                    <Col sm={7} xs={24}>
                        <a href='https://utilitynyc.com/' target='_blank'><img alt='Utility' src='u-logo.svg' /></a>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
