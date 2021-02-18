import { Row, Col, Typography } from 'antd'
import CardContent from '@components/about/CardContent'
import useWindowDimensions from "../../hooks/windowSize";

const { Title } = Typography

const LeadershipArray = [
    {
    imageURL: "/Kaya-Henderson.jpg",
    name: "Kaya Henderson",
    designation: "Founder & CEO",
    description: "Founder & CEO, Former Chancellor, DC Public Schools, and Head of Global Learning Lab, Teach for All",
  },
  {
    imageURL: "/Kenya-Bradshaw.jpg",
    name: "Kenya Bradshaw",
    designation: "Community Building Advisor",
    description: "Community Building Advisor",
  },
  {
    imageURL: "/Roland-Fryer.jpg",
    name: "Roland Fryer",
    designation: "Founder & Executive Chairman",
    description: "Founder and Executive Chairman, Professor of Economics, Harvard University",
  },
  {
    imageURL: "/Geoffrey-Canada.jpg",
    name: "Geoffrey Canada",
    designation: "Education Advisor",
    description: "Education Advisor, President of Harlem Children's Zone",
  },
  {
    imageURL: "/William-Helman.jpg",
    name: "Bill Helman",
    designation: "Board Member",
    description: "Board Member, Former Managing Partner, Greylock Partners",
  },
];

export default function Leadership() {
    const windowDimensions = useWindowDimensions();
    return (
        <div className="leadership__wrapper">
            <div className="container">
                <Row>
                    <Col span={22} offset={2}>
                        <div className="grid__descroption">
                            <Title level={4}>Leadership</Title>
                            <p>Putting our people at the center of every decision</p>
                        </div>
                    </Col>
                </Row>
                <div className="grid__photo__wrapper">
                    {windowDimensions.width <= 991 ? (
                        <Row gutter={[30, 30]}>
                            {LeadershipArray.map((person, index) => (
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={person.imageURL}
                                        title={person.name}
                                        designation={person.designation}
                                        description={person.description}
                                    />
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <>
                            <Row gutter={[30, 30]} className="row__grid__1">
                                                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/William-Helman.jpg`}
                                        title={`Bill Helman`}
                                        designation={`Board Member`}
                                        description={`Board Member, Former Managing Partner, Greylock Partners`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Geoffrey-Canada.jpg`}
                                        title={`Geoffrey Canada`}
                                        designation={`Education Advisor`}
                                        description={`Education Advisor, President of Harlem Children's Zone`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Kaya-Henderson.jpg`}
                                        title={`Kaya Henderson`}
                                        designation={`Founder & CEO`}
                                        description={`Founder & CEO, Former Chancellor, DC Public Schools, and Head of Global Learning Lab, Teach for All`}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={[30, 30]} className="row__grid__common">
                                <Col md={6} sm={8} xs={12}></Col>
                                <Col md={6} sm={8} xs={12}></Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Roland-Fryer.jpg`}
                                        title={`Roland Fryer`}
                                        designation={`Founder & Executive Chairman`}
                                        description={`Founder & Executive Chairman, Professor of Economics, Harvard University`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Kenya-Bradshaw.jpg`}
                                        title={`Kenya Bradshaw`}
                                        designation={`Community Building Advisor`}
                                        description={`Community Building Advisor, VP of Policy and Community Engagement, TNTP`}
                                    />
                                </Col>
                            </Row>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
