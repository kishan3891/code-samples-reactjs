import { Row, Col, Typography } from 'antd'

const { Title } = Typography

export default function Hero() {
    return (
      <div className="hero__wrapper hero__wrapper__inner">
        <div className="container center">
          <Row>
            <Col span={24}>
              <Title level={1}>
                Don’t just teach history, <br />
                make it!
              </Title>
              <a
                href="https://reconstruction20.typeform.com/to/SqSalzWp"
                className="button-primary-xl with-arrow-right"
                target='_blank'
              >
                Apply Now
                <img alt="Arrow" src="/button-arrow.svg" />
              </a>
            </Col>
          </Row>
        </div>
      </div>
    );
}
