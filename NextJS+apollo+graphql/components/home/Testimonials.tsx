import { Row, Col } from 'antd'

export default function Testimonials() {
    return (
        <div className='testimonials__wrapper center'>
            <Row>
                <Col span={24}>
                    <p>"Our parent leaders at PAVE have been asking for curriculum and academic tutoring that is centered in telling the truth about our history and celebrating Black excellence. So, thank you!"</p>
                    <div className='testimonials__meta'>
                        <div className='testimonials__image'>
                            <img alt='Maya Martin Cadogan' src='/quote-image.jpg' />
                        </div>
                        <div className='testimonials___author__name'>
                            Maya Martin Cadogan
                        </div>
                        <div className='testimonials___author__position'>
                            Executive Director, PAVE (Parents Amplifying Voices in Education)
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
