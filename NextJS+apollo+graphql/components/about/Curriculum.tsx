import { Row, Col, Typography } from 'antd'
import CardContent from '@components/about/CardContent'
import useWindowDimensions from "../../hooks/windowSize";

const { Title } = Typography

const CurriculumArray = [
    {
        imageURL: '/Rachel-Etienne-Curriculum.png',
        name: 'Rachel Etienne',
        designation: 'Education Lead',
        description: 'Education Lead',
    },
    {
        imageURL: '/Erica-Buddington-Curriculum.jpg',
        name: 'Erica Buddington',
        designation: 'Reconstruction Reading and Spoken Word Lead',
        description: 'Reconstruction Reading and Spoken Word Lead',
    },
    {
        imageURL: '/Tamyra-Walker-Curriculum.jpg',
        name: 'Tamyra Walker',
        designation: 'Mathematics Lead',
        description: 'Mathematics Lead',
    },
    {
        imageURL: '/Kaci-Morgan-Curriculum.jpeg',
        name: 'Kaci Morgan',
        designation: 'High School Content Lead',
        description: 'High School Content Lead',
    },
    {
        imageURL: '/Quintin_Bostic-Curriculum.jpg',
        name: 'Quintin Bostic',
        designation: 'Foundational Reading - Kindergarten',
        description: 'Foundational Reading - Kindergarten',
    },
    {
        imageURL: '/Adrianne-Sublett-Curriculum.jpeg',
        name: 'Adrianne Sublett',
        designation: 'Foundational Reading - Grade 2',
        description: 'Foundational Reading - Grade 2',
    },
    {
        imageURL: '/MelissaCollins-Curriculum.jpg',
        name: 'Dr. Melissa Collins',
        designation: 'Mathematics - Grade 2',
        description: 'Mathematics - Grade 2',
    },
    {
        imageURL: '/DiamondSkinner-Curriculum.jpg',
        name: 'Diamond Skinner',
        designation: 'Spoken Word - Grade 4-5',
        description: 'Spoken Word - Grade 4-5',
    },
    {
        imageURL: '/erikahardaway-Curriculum.jpeg',
        name: 'Erika Hardaway',
        designation: 'Reconstruction Reading - Grade 6-8',
        description: 'Reconstruction Reading - Grade 6-8',
    },
    {
        imageURL: '/alexisbarnes-Curriculum.jpeg',
        name: 'Alexis Barnes',
        designation: 'Reconstruction Reading - Grade 4-5',
        description: 'Reconstruction Reading - Grade 4-5',
    },
    {
        imageURL: '/Anais-Childress-Curriculum.jpg',
        name: 'Anais Childress',
        designation: 'Pre-AP World History & Geography',
        description: 'Pre-AP World History & Geography',
    },
    {
        imageURL: '/Anthony-Bowden-Curriculum.jpg',
        name: 'Anthony Bowden',
        designation: 'Reconstruction Reading - Grade K-1',
        description: 'Reconstruction Reading - Grade K-1',
    },
    {
        imageURL: '/Saamra-Mekuria-Grillo-Curriculum.jpg',
        name: 'Saamra Mekuria - Grillo',
        designation: 'Deep Thinking - Entrepreneurship',
        description: 'Deep Thinking - Entrepreneurship',
    },
    {
        imageURL: '/Yvette-Manns-Curriculum.png',
        name: 'Yvette Manns',
        designation: 'Foundational Reading - Grade 1',
        description: 'Foundational Reading - Grade 1',
    },
    {
        imageURL: '/Brian-Pick.jpg',
        name: 'Brian Pick',
        designation: 'Curriculum Advisor',
        description: 'Curriculum Advisor, Former Chief of Teaching and Learning DCPS',
    },
];

export default function Curriculum() {
    const windowDimensions = useWindowDimensions();
    return (
        <div className="curriculum__wrapper">
            <div className="container">
                <Row>
                    <Col span={8} offset={14}>
                        <div className="grid__descroption">
                            <Title level={4}>Curriculum</Title>
                            <p>Topics you should learn</p>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <div className="grid__photo__wrapper curriculum__grid__photo__wrapper">
                    {windowDimensions.width <= 991 ? (
                        <Row gutter={[30, 30]}>
                            {CurriculumArray.map((person, index) => (
                                <Col md={6} sm={8} xs={12} key={index}>
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
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Rachel-Etienne-Curriculum.png`}
                                        title={`Rachel Etienne`}
                                        designation={`Education Lead`}
                                        description={`Education Lead`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Erica-Buddington-Curriculum.jpg`}
                                        title={`Erica Buddington`}
                                        designation={`Reconstruction Reading and Spoken Word Lead`}
                                        description={`Reconstruction Reading and Spoken Word Lead`}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={[30, 30]} className="row__grid__common">
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Tamyra-Walker-Curriculum.jpg`}
                                        title={`Tamyra Walker`}
                                        designation={`Mathematics Lead`}
                                        description={`Mathematics Lead`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Kaci-Morgan-Curriculum.jpeg`}
                                        title={`Kaci Morgan`}
                                        designation={`High School Content Lead`}
                                        description={`High School Content Lead`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Quintin_Bostic-Curriculum.jpg`}
                                        title={`Quintin Bostic`}
                                        designation={`Foundational Reading - Kindergarten`}
                                        description={`Foundational Reading - Kindergarten`}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={[30, 30]} className="row__grid__common">
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Adrianne-Sublett-Curriculum.jpeg`}
                                        title={`Adrianne Sublett`}
                                        designation={`Foundational Reading - Grade 2`}
                                        description={`Foundational Reading - Grade 2`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/MelissaCollins-Curriculum.jpg`}
                                        title={`Dr. Melissa Collins`}
                                        designation={`Mathematics - Grade 2`}
                                        description={`Mathematics - Grade 2`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/DiamondSkinner-Curriculum.jpg`}
                                        title={`Diamond Skinner`}
                                        designation={`Spoken Word - Grade 4-5`}
                                        description={`Spoken Word - Grade 4-5`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/erikahardaway-Curriculum.jpeg`}
                                        title={`Erika Hardaway`}
                                        designation={`Reconstruction Reading - Grade 6-8`}
                                        description={`Reconstruction Reading - Grade 6-8`}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={[30, 30]} className="row__grid__common">
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/alexisbarnes-Curriculum.jpeg`}
                                        title={`Alexis Barnes`}
                                        designation={`Reconstruction Reading - Grade 4-5`}
                                        description={`Reconstruction Reading - Grade 4-5`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Anais-Childress-Curriculum.jpg`}
                                        title={`Anais Childress`}
                                        designation={`Pre-AP World History & Geography`}
                                        description={`Pre-AP World History & Geography`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Anthony-Bowden-Curriculum.jpg`}
                                        title={`Anthony Bowden`}
                                        designation={`Reconstruction Reading - Grade K-1`}
                                        description={`Reconstruction Reading - Grade K-1`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Saamra-Mekuria-Grillo-Curriculum.jpg`}
                                        title={`Saamra Mekuria - Grillo`}
                                        designation={`Deep Thinking - Entrepreneurship`}
                                        description={`Deep Thinking - Entrepreneurship`}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={[30, 30]} className="row__grid__common">
                                <Col md={6} sm={8} xs={12}></Col>
                                <Col md={6} sm={8} xs={12}></Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Yvette-Manns-Curriculum.png`}
                                        title={`Yvette Manns`}
                                        designation={`Foundational Reading - Grade 1`}
                                        description={`Foundational Reading - Grade 1`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Brian-Pick.jpg`}
                                        title={`Brian Pick`}
                                        designation={`Curriculum Advisor`}
                                        description={`Curriculum Advisor, Former Chief of Teaching and Learning DCPS`}
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
