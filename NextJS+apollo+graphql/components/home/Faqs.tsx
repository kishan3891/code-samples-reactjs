import { Row, Col, Typography, Collapse } from 'antd'
import {
    PlusOutlined as PlusIcon,
    MinusOutlined as MinusIcon
} from '@ant-design/icons'
import GetInvolved from '@components/home/GetInvolved'

const { Panel } = Collapse
const { Title } = Typography

export default function FAQs() {
    return (
      <div className="faqs__wrapper">
        <div className="container">
          <div className="faqs__inner">
            <Row>
              <Col span={24}>
                <Title level={2}>
                  Frequently <br />
                  Asked Questions
                </Title>
              </Col>
            </Row>
            <Row className="faq__collapse">
              <Col span={24}>
                <Collapse
                  defaultActiveKey={["1"]}
                  ghost
                  expandIconPosition="right"
                  expandIcon={({ isActive }) =>
                    isActive ? <MinusIcon /> : <PlusIcon />
                  }
                  className="faq__collapse__custom"
                >
                  <Panel
                    header="How Long Are the Courses?"
                    key="1"
                    className="faq__collapse__custom_panel"
                  >
                    <p>Courses are two days a week for five weeks. Each session is an hour long.</p>
                  </Panel>
                  <Panel
                    header="How Much Does It Cost?"
                    key="2"
                    className="faq__collapse__custom_panel"
                  >
                    <p>Sessions are $10 an hour.</p>
                  </Panel>
                  <Panel
                    header="What Types of Courses Do you Offer?"
                    key="3"
                    className="faq__collapse__custom_panel"
                  >
                    <p>For students between the ages of 5 and 13, we offer courses in reading, mathematics, and spoken word.</p>
                    <p>For ages 14-18, we offer three types of courses: Reconstruction Canon, Deep Thinking (Black Shakespeare, entrepreneurship, and protests and movements) and Pre-AP (English I, World History and Geography, and Calculus)</p>
                  </Panel>
                  <Panel
                    header="Can Anyone Enroll?"
                    key="4"
                    className="faq__collapse__custom_panel"
                  >
                    <p>In early Fall 2020, youth in selected cities can participate through their schools or community organizations.</p>
                    <p>In Winter 2020, we will make courses available directly to the public.</p>
                    <p>The first 5,000 individuals on our list will be the first to enroll in our next slate of courses. And, of course, everyone is welcome to take part in Reconstruction.</p>
                  </Panel>
                  <Panel
                    header="Is This a Replacement for School?"
                    key="5"
                    className="faq__collapse__custom_panel"
                  >
                    <p>Absolutely not. We focus on very different things and are not beholden to what "must" be taught. We only teach what we think you absolutely must know.</p>
                  </Panel>
                </Collapse>
              </Col>
            </Row>
            {/* <div className="faq__reachout center">
              <Row>
                <Col span={24}>
                  <div className="faq__reachout__left">
                    <Text>Have a question that's not answered here?</Text>
                  </div>
                </Col>
                <Col span={24}>
                  <Row justify="space-around">
                    <Col>
                      <Link href="/">
                        <a className="button-primary">
                          Reach Out to Us
                        </a>
                      </Link>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div> */}
          </div>
          <GetInvolved />
        </div>
      </div>
    );
}
