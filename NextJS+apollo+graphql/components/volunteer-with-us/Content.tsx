import { Row, Col, Typography } from 'antd'

const { Title } = Typography

export default function ContentVolunteerUs() {
    return (
      <div className="box__card__outer">
        <div className="container">
          <div className="box__card__wrapper box__card__volunteer__wrapper">
            <div className="box__card__inner article__content">
              <Row>
                <Col span={24}>
                  <Title level={3}>Your time is invaluable</Title>
                  <p>Volunteer as a Reconstruction Instructor and teach an authentic curriculum on the brilliance, resilience, and magic of the Black Community.</p>
                  <p>Reconstructors work remotely via our online platform with small groups of six students at a time, working to build relationships, encourage positive identity formation, and improve academic results.</p>
                  <p>Volunteers sign on to teach a minimum of one full course that includes 2 teaching hours per week for approximately 5 weeks.</p>
                  <Title level={3}>Our Volunteer Matching Program</Title>
                  <p>Volunteers not only give their own time for a cause we all believe in, but also provide an opportunity for children to access our classes and content who otherwise may be unable to do so.</p>
                  <Title level={3}>Teach a course, give a course</Title>
                  <p>For each course that a volunteer teaches, we will sponsor the enrollment of one child in another Reconstruction course—at no cost to the family.</p>
                  <Title level={3}>Learn more and apply to volunteer today</Title>
                  <p>All volunteers must go through the same selection process as our paid instructors.</p>
                </Col>
                <Col span={24} className="center">
                  <a
                    href="https://reconstruction20.typeform.com/to/SqSalzWp"
                    className="button-primary-xl apply-for-volunteer with-arrow-right"
                    target="_blank"
                  >
                    Apply to Volunteer Today
                    <img alt="Arrow" src="button-arrow.svg" />
                  </a>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
}
