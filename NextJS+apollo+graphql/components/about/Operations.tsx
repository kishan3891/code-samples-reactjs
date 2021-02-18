import { Row, Col, Typography } from 'antd'
import CardContent from '@components/about/CardContent'
import useWindowDimensions from "../../hooks/windowSize";

const { Title } = Typography

const OperationsArray = [
    {
        imageURL: '/Alia-McCants.jpg',
        name: 'Alia McCants',
        designation: 'Customer Experience Lead',
        description: 'Customer Experience Lead',
    },
    {
        imageURL: '/Sofina-Mann.jpeg',
        name: 'Sofina Mann',
        designation: 'Operations Manager',
        description: 'Operations Manager',
    },
    {
        imageURL: '/Tanaya-Devi.jpg',
        name: 'Tanaya Devi',
        designation: 'Data Science Advisor',
        description: 'Data Science Advisor',
    },
    {
        imageURL: '/Tim-Johnson.jpg',
        name: 'Tim Johnson',
        designation: 'Instructor Recruitment Lead',
        description: 'Instructor Recruitment Lead',
    },
    {
        imageURL: '/Nina-Conley.jpg',
        name: 'Nina Conley',
        designation: 'Instructor Trainer',
        description: 'Instructor Trainer',
    },
    {
        imageURL: '/Maureen-Malcolm.jpeg',
        name: 'Maureen Malcolm',
        designation: 'Instructor Recruitment Manager',
        description: 'Instructor Recruitment Manager',
    },
    {
        imageURL: '/Rosy-Marquez.jpg',
        name: 'Rosy Marquez',
        designation: 'Instructor Recruitment Manager',
        description: 'Instructor Recruitment Manager',
    },
    {
        imageURL: '/Michael-Goldstein.jpg',
        name: 'Michael Goldstein',
        designation: 'Instructor Advisor',
        description: 'Instructor Advisor, Founder Match Education',
    },
    {
        imageURL: '/Christina_Heitz.jpg',
        name: 'Christina Heitz',
        designation: 'Product Advisor',
        description: 'Product Advisor, Founder and CEO, Cambiar Education',
    },
];

export default function Operations() {
    const windowDimensions = useWindowDimensions();
    return (
        <div className="curriculum__wrapper curriculum__wrapper__last">
            <div className="container">
                <Row>
                    <Col span={8} offset={14}>
                        <div className="grid__descroption">
                            <Title level={4}>Operations</Title>
                            <p>It's all about the customer experience</p>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <div className="grid__photo__wrapper curriculum__grid__photo__wrapper grid__photo__wrapper__last">
                    {windowDimensions.width <= 991 ? (
                        <Row gutter={[30, 30]}>
                            {OperationsArray.map((person, index) => (
                                <Col lg={6} md={6} sm={8} xs={12}>
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
                            <Row gutter={[30, 30]} className="row__grid__1 curriculum__grid__1">
                                <Col lg={6} md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Sofina-Mann.jpeg`}
                                        title={`Sofina Mann`}
                                        designation={`Operations Manager`}
                                        description={`Operations Manager`}
                                    />
                                </Col>
                                <Col lg={6} md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Alia-McCants.jpg`}
                                        title={`Alia McCants`}
                                        designation={`Customer Experience Lead`}
                                        description={`Customer Experience Lead`}
                                    />
                                </Col>

                            </Row>
                            <Row gutter={[30, 30]} className="row__grid__common">
                               <Col lg={6} md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Nina-Conley.jpg`}
                                        title={`Nina Conley`}
                                        designation={`Instructor Trainer`}
                                        description={`Instructor Trainer`}
                                    />
                                </Col>
                                <Col lg={6} md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Tim-Johnson.jpg`}
                                        title={`Tim Johnson`}
                                        designation={`Instructor Recruitment Lead`}
                                        description={`Instructor Recruitment Lead`}
                                    />
                                </Col>
                               <Col lg={6} md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Tanaya-Devi.jpg`}
                                        title={`Tanaya Devi`}
                                        designation={`Data Science Advisor`}
                                        description={`Data Science Advisor`}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={[30, 30]} className="row__grid__common">
                                <Col lg={6} md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Maureen-Malcolm.jpeg`}
                                        title={`Maureen Malcolm`}
                                        designation={`Instructor Recruitment Manager`}
                                        description={`Instructor Recruitment Manager`}
                                    />
                                </Col>
                                <Col lg={6} md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Rosy-Marquez.jpg`}
                                        title={`Rosy Marquez`}
                                        designation={`Instructor Recruitment Manager`}
                                        description={`Instructor Recruitment Manager`}
                                    />
                                </Col>
                                <Col lg={6} md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Michael-Goldstein.jpg`}
                                        title={`Michael Goldstein`}
                                        designation={`Instructor Advisor`}
                                        description={`Instructor Advisor, Founder Match Education`}
                                    />
                                </Col>
                                <Col lg={6} md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Christina_Heitz.jpg`}
                                        title={`Christina Heitz`}
                                        designation={`Product Advisor`}
                                        description={`Product Advisor, Founder and CEO, Cambiar Education`}
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
