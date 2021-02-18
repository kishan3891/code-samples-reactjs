import { Row, Col, Typography } from 'antd'

const { Title } = Typography

export default function Hero() {
    return (
      <div className="hero__wrapper hero__wrapper__inner">
        <div className="container center">
          <Row>
            <Col span={24}>
              <Title level={1}>
                10 hours can <br />
                change a lifetime
              </Title>
              <a
                href="https://reconstruction20.typeform.com/to/SqSalzWp"
                target="_blank"
                className="button-primary-xl apply-for-volunteer with-arrow-right"
              >
                Apply to Volunteer Today <img alt="Arrow" src="/button-arrow.svg" />
              </a>
            </Col>
          </Row>
        </div>
      </div>
    );
}
