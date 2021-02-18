import { Row, Col, Typography } from 'antd'
import { ReconstructionCard } from '@components/common/card'

const { Title } = Typography

export default function ContentWorkWithUs() {
    return (
      <div className="box__card__outer">
        <div className="container">
          <div className="box__card__wrapper box__card__volunteer__wrapper">
            <div className="box__card__inner article__content">
              <Row>
                <Col span={24}>
                  <Title level={3}>The greatest $20/hour part-time job in the world. Ever.</Title>
                  <p>Teach an Unapologetically Black curriculum, part-time, via live video, for $20/hr.</p>
                  <Title level={3}>You’ll carve a new path for students.</Title>
                  <p>Reconstruction instructors teach an authentic curriculum on the brilliance, resilience, and magic of the Black Community.</p>
                  <p>Instructors work remotely via our online platform with small groups of six students at a time, working to build relationships, encourage positive identity formation, and improve academic results.</p>
                  <Title level={3}>
                    We reach beyond teachers—we want Advocates. Reformers. Fighters.
                  </Title>
                  <Title level={3}>Reconstructors are:</Title>
                  <ol>
                    <li>
                      <strong>Outraged and moved to action</strong> by educational inequities. They believe that all students can learn and achieve at high levels.
                    </li>
                    <li>
                      <strong>Coaches,</strong> motivating students to achieve ambitious goals by igniting their passion.
                    </li>
                    <li>
                      <strong>Organized, prepared, and deeply reflective.</strong> They effectively organize, prioritize, and coach in ways that foster student learning, engagement and joy.
                    </li>
                    <li>
                      <strong>Culturally competent.</strong> You have an understanding of your own identity, the identities of your students, and how our identities shape our experiences and perspectives.
                    </li>
                    <li>
                      <strong>Empathetic.</strong> You can work to build rapport, trust, and deep connections that positively impact students. You model empathy for others and demonstrate a connection with your students.
                    </li>
                    <li>
                      <strong>Guided by Love.</strong> You honor students’ sense of humanity and dignity, and have the same expectations of their success as you would for your own children.
                    </li>
                  </ol>
                  <Title level={3}>Interested?</Title>
                  <p>We’re looking for current college students, recent graduates, retirees, teachers, and others who are great with young people to work remotely and part time. We’re currently accepting applications on a rolling basis for a Fall 2020 start.</p>
                </Col>
              </Row>
              <Row className="what__we__do__wrapper">
                <Col span={24} className="center">
                  <Title level={3}>The Process</Title>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col
                      xl={8}
                      lg={24}
                      md={24}
                      sm={24}
                      xs={24}
                      style={{ display: "flex" }}
                    >
                      <ReconstructionCard
                        title={
                          "<span>Step 1.</span> Complete online application"
                        }
                        description="What to expect: share basic information about yourself, answer questions and upload your resume.<p><strong>Estimated time: 15 minutes</strong></p>"
                      />
                    </Col>
                    <Col
                      xl={8}
                      lg={24}
                      md={24}
                      sm={24}
                      xs={24}
                      style={{ display: "flex" }}
                    >
                      <ReconstructionCard
                        title={
                          "<span>Step 2.</span> Submit video to answer short questions; math test (if math preference)"
                        }
                        description="What to expect: respond to open ended prompts via video; this is your time to shine.<p><strong>Estimated time: 30 minutes</strong></p>"
                      />
                    </Col>
                    <Col
                      xl={8}
                      lg={24}
                      md={24}
                      sm={24}
                      xs={24}
                      style={{ display: "flex" }}
                    >
                      <ReconstructionCard
                        title={
                          "<span>Step 3.</span> Deliver a mock online teaching session with content we provide"
                        }
                        description="What to expect: review and internalize an abbreviated lesson plan and then teach the content via live video.<p><strong>Estimated time: 60 minutes</strong></p>"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <p>Candidates who successfully complete each step are extended offers to join our inaugural cohort of instructors who will join our team in early Fall 2020. All instructors must be legally eligible for employment in the United States. Offers are contingent upon successfully passing reference and background checks.</p>
                  <p>Questions? <a href="mailto:timjohnson@reconstruction.us">Email us</a> today!</p>
                  <p>
                    <a
                      href="/Reconstruction-Instructors-Job-Description.pdf"
                      target="_blank"
                    >
                      Click here to view the complete Job Description
                    </a>
                  </p>
                </Col>
                <Col span={24} className="center">
                  <a
                    href="https://reconstruction20.typeform.com/to/SqSalzWp"
                    className="button-primary-xl with-arrow-right"
                    target="_blank"
                  >
                    Apply Now
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
