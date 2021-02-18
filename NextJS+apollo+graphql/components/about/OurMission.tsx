import { Row, Col, Typography } from 'antd'

const { Title } = Typography

export default function OurMission() {
    return (
        <div className='box__card__outer'>
            <div className='container'>
                <div className='box__card__wrapper'>
                    <div className='box__card__inner'>
                        <Row>
                            <Col span={24}>
                                <Title level={2}>Our Story</Title>
                                <p>In August of 2019, two friends met for a drink, and decided that they wanted to find new and better ways to inspire children’s imaginations. They wanted to reconnect kids to the magic of the Black community that had supported them along their journeys, the community that made them feel like anything was possible. Out of that conversation, Reconstruction, Inc was born.</p>
                                <p>Science tells us that beliefs and identity are strongly shaped by schooling. With this in mind, many ethnic groups around the world have founded organizations for the purpose of their identity development. However, traditional curriculum situates people of the African Diaspora in a minimally positive -- and many times negative -- light. As a result, generations of Black students have felt disengaged, misunderstood, and unsafe.</p>
                                <p>Reconstruction was created to show our kids that they are descendants of powerful, creative, and resilient ancestors whose contributions permeate every aspect of life across the globe; and that they too are called to contribute to this rich legacy. It's the way we were taught as children. It's the way we teach our children.</p>
                                <p>Join us.</p>
                                <p className='your-sincerely'>#fortheculture, <strong>The Reconstruction Crew</strong></p>
                                <a href="#ourpeople" id="ourpeople"/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}
