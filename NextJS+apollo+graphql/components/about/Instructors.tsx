import { Row, Col, Typography } from 'antd';
import CardContent from '@components/about/CardContent';
import useWindowDimensions from '../../hooks/windowSize';

const { Title } = Typography;

const InstructorsArray = [
    {
        imageURL: '/Alex-Bernui-Tutors.jpg',
        name: 'Alex Bernui',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Danver-Chandler-Tutors.jpg',
        name: 'Danver Chandler',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Ashley-Johnson-Tutors.jpg',
        name: 'Ashley Johnson',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Bria_Gamble.jpg',
        name: 'Bria Gamble',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/David-Edgerton-III-Tutors.jpg',
        name: 'David Edgerton III',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Jayla-Scott-Tutors.jpg',
        name: 'Jayla Scott',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Ify_Ogu.jpg',
        name: 'Ify Ogu',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Elizabeth-Bolarinwa-Tutors.jpg',
        name: 'Elizabeth Bolarinwa',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Felicia-Hayes-Tutors.jpg',
        name: 'Felicia Hayes',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Jenee-Cidel-Tutors.jpg',
        name: 'Jenee Cidel',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Kennedy-Jones-Tutors.jpg',
        name: 'Kennedy Jones',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Magdalen-Kwarteng-Tutors.png',
        name: 'Magdalen Kwarteng',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Maryam-Trowell-Tutors.jpg',
        name: 'Maryam Trowell',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Christian_Pridgen.jpg',
        name: 'Christian Pridgen',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Mitchell-Brookins-Tutors.jpg',
        name: 'Mitchell Brooking',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Neva-Taylor-Tutors.jpg',
        name: 'Neva Taylor',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Nia-Warren-Tutors.jpg',
        name: 'Nia Warren',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Cristen-Williams.jpg',
        name: 'Cristen Williams',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Ryan-Bartee-Tutors.jpg',
        name: 'Ryan Bartee',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Selena-Covington-Tutors.jpg',
        name: 'Selena Covington',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Shirmeca-Littlejohn-Tutors.jpg',
        name: 'Shirmeca Littlejohn',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Sienna-Campbell-Tutors.jpg',
        name: 'Sienna Campbell',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Siera-Whitaker-Tutors.jpg',
        name: 'Siera Whitaker',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Simone-Becker-Tutors.jpg',
        name: 'Simone Becker',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
    {
        imageURL: '/Tayla-Conley-Tutors.jpg',
        name: 'Tayla Conley',
        designation: 'Reconstructor',
        description: 'Reconstructor',
    },
];

export default function Instructors() {
    const windowDimensions = useWindowDimensions();
    return (
        <div className="leadership__wrapper instructors__wrapper">
            <div className="container">
                <Row>
                    <Col span={22} offset={2}>
                        <div className="grid__descroption">
                            <Title level={4}>Instruction</Title>
                            <p>Instructors who get it</p>
                        </div>
                    </Col>
                </Row>
                <div className="grid__photo__wrapper">
                    {windowDimensions.width <= 991 ? (
                        <Row gutter={[30, 30]}>
                            {InstructorsArray.map((person, index) => (
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
                                        imageURL={`/Alex-Bernui-Tutors.jpg`}
                                        title={`Alex Bernui`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Alana-Woffard.jpg`}
                                        title={`Alana Woffard`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Danver-Chandler-Tutors.jpg`}
                                        title={`Danver Chandler`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={[30, 30]} className="row__grid__common">
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Ashley-Johnson-Tutors.jpg`}
                                        title={`Ashley Johnson`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Bria_Gamble.jpg`}
                                        title={`Bria Gamble`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/David-Edgerton-III-Tutors.jpg`}
                                        title={`David Edgerton III`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Jayla-Scott-Tutors.jpg`}
                                        title={`Jayla Scott`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={[30, 30]} className="row__grid__common">
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Ify_Ogu.jpg`}
                                        title={`Ify Ogu`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Elizabeth-Bolarinwa-Tutors.jpg`}
                                        title={`Elizabeth Bolarinwa`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Felicia-Hayes-Tutors.jpg`}
                                        title={`Felicia Hayes`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Jenee-Cidel-Tutors.jpg`}
                                        title={`Jenee Cidel`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={[30, 30]} className="row__grid__common">
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Kennedy-Jones-Tutors.jpg`}
                                        title={`Kennedy Jones`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Magdalen-Kwarteng-Tutors.png`}
                                        title={`Magdalen Kwarteng`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Maryam-Trowell-Tutors.jpg`}
                                        title={`Maryam Trowell`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Christian_Pridgen.jpg`}
                                        title={`Christian Pridgen`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={[30, 30]} className="row__grid__common">
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Mitchell-Brookins-Tutors.jpg`}
                                        title={`Mitchell Brooking`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Neva-Taylor-Tutors.jpg`}
                                        title={`Neva Taylor`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Nia-Warren-Tutors.jpg`}
                                        title={`Nia Warren`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Cristen-Williams.jpg`}
                                        title={`Cristen Williams`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={[30, 30]} className="row__grid__common">
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Ryan-Bartee-Tutors.jpg`}
                                        title={`Ryan Bartee`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Selena-Covington-Tutors.jpg`}
                                        title={`Selena Covington`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Shirmeca-Littlejohn-Tutors.jpg`}
                                        title={`Shirmeca Littlejohn`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Sienna-Campbell-Tutors.jpg`}
                                        title={`Sienna Campbell`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={[30, 30]} className="row__grid__common">
                                <Col md={6} sm={8} xs={12}></Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Siera-Whitaker-Tutors.jpg`}
                                        title={`Siera Whitaker`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Simone-Becker-Tutors.jpg`}
                                        title={`Simone Becker`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
                                    />
                                </Col>
                                <Col md={6} sm={8} xs={12}>
                                    <CardContent
                                        imageURL={`/Tayla-Conley-Tutors.jpg`}
                                        title={`Tayla Conley`}
                                        designation={`Reconstructor`}
                                        description={`Reconstructor`}
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
