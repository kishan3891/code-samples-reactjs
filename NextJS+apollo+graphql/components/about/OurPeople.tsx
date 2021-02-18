import { Row, Col, Typography } from 'antd'
import Leadership from '@components/about/Leadership'
import Curriculum from '@components/about/Curriculum'
import Operations from '@components/about/Operations'
import Instructors from '@components/about/Instructors'

const { Title } = Typography

export default function OurPeople() {
    return (
        <div className="our__people__wrapper">
            <a href="#ourpeople" id="ourpeople"/>
            <div className="container">
                <div className="our__people__inner center">
                    <Row>
                        <Col span={24}>

                            <Title level={1}>Our People</Title>
                            <p>
                                Reconstruction was created by a dream team of artists, mathematicians, literature geeks,
                                entrepreneurs, illustrators, and others. All of us share one goal: empowering students
                                and their communities through an authentic education.
                            </p>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="grid__wrapper">
                <Leadership />
                <div className="curriculum__operations__mixer">
                    <div className="curriculum__bottom__bg">
                        <Curriculum />
                        <Instructors />
                    </div>
                </div>
                <div className="curriculum__operations__mixer">
                    <Operations />
                </div>
            </div>
        </div>
    );
}
