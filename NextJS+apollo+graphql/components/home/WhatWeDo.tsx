import { Row, Col, Typography } from 'antd'
import { ReconstructionCard } from "@components/common/card";
const { Title } = Typography

export default function WhatWeDo() {
    return (
      <div className="what__we__do__wrapper">
        <Row>
          <Col span={24} className="center">
            <Title level={2}>
              It's more than an education.<br />It's a movement.
            </Title>
          </Col>
          <Col span={24}>
            <Row>
              <Col lg={8} md={8} sm={24} xs={24} style={{ display: "flex" }}>
                <ReconstructionCard
                  title={"Built For You, By People Like You"}
                  description="Everything at Reconstruction — the instructors, curriculum, and classes — is designed for you, by people like you, who put you at the center of every decision."
                />
              </Col>
              <Col lg={8} md={8} sm={24} xs={24} style={{ display: "flex" }}>
                <ReconstructionCard
                  title={"Identity Development"}
                  description="Education is more than a list of facts — it helps shape beliefs and identity. We cannot leave such important decisions to indifferent schools."
                />
              </Col>
              <Col lg={8} md={8} sm={24} xs={24} style={{ display: "flex" }}>
                <ReconstructionCard
                  title={"Instructors <br /> Who Get It"}
                  description="Our instructors understand the Black experience, how race permeates every aspect of American society, and how the magic of the Black community has influenced the world for centuries."
                />
              </Col>
              <Col lg={8} md={8} sm={24} xs={24} style={{ display: "flex" }}>
                <ReconstructionCard
                  title={"Things You Should Know"}
                  description="We read more Richard Wright than Charles Dickens and go deep into topics like discrete mathematics, entrepreneurship, and economics. We are not about what you <i>have</i> to know, we are about what you <i>should</i> know."
                />
              </Col>
              <Col lg={8} md={8} sm={24} xs={24} style={{ display: "flex" }}>
                <ReconstructionCard
                  title={"Live, Small<br /> Groups"}
                  description="Reconstruction groups are never more than six learners with one instructor. All live, from the comfort of your home."
                />
              </Col>
              <Col lg={8} md={8} sm={24} xs={24} style={{ display: "flex" }}>
                <ReconstructionCard
                  title={"A Crew You<br /> Can Count On"}
                  description="We are a team that will move mountains to make sure students succeed!"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
}
