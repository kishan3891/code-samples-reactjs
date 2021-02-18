import { Row, Col, Typography } from 'antd'
import PopOverContent from "@components/home/Tutors/popover";

const { Title } = Typography

export default function BlackEducators() {
    return (
        <Row className="educators__wrapper">
            <Col span={24} className="center">
                <Title level={2}>Created by a team dedicated to empowering our communities</Title>
            </Col>
            <Col span={24}>
                <Row gutter={[20, 0]} align="middle">
                    <div className="col-4dot8">
                        <PopOverContent
                            imageSrc="/Erica-Buddington.jpg"
                            title="Erica Buddington"
                            description="Reconstruction Reading and Spoken Word Lead"
                        />
                    </div>
                    <div className="col-4dot8">
                        <PopOverContent
                            imageSrc="/Kaci-Morgan.jpeg"
                            title="Kaci Morgan"
                            description="High School Content Lead"
                        />
                    </div>
                    <div className="col-4dot8">
                        <PopOverContent
                            imageSrc="/Tamyra-Walker.jpg"
                            title="Tamyra Walker"
                            description="Mathematics Lead"
                        />
                    </div>
                    <div className="col-4dot8">
                        <PopOverContent
                            imageSrc="/Quintin_Bostic.jpg"
                            title="Quintin Bostic"
                            description="Foundational Reading Writer - Kindergarten"
                        />
                    </div>
                    <div className="col-4dot8">
                        <PopOverContent
                            imageSrc="/MelissaCollins.jpg"
                            title="Dr Melissa Collins"
                            description="Mathematics Writer - Grade 2"
                        />
                    </div>
                    <div className="col-4dot8">
                        <PopOverContent
                            imageSrc="/Jamaal-Clarke.jpg"
                            title="Jamaal Clarke"
                            description="Grand Central Atelier"
                        />
                    </div>
                    <div className="col-4dot8">
                        <PopOverContent
                            imageSrc="/Cameron-Young.jpg"
                            title="Cameron Young"
                            description="University of Maryland College Park"
                        />
                    </div>
                    <div className="col-4dot8">
                        <PopOverContent
                            imageSrc="/Michael-Sanchez.png"
                            title="Michael Sanchez"
                            description="The University of Texas at Austin"
                        />
                    </div>
                    <div className="col-4dot8">
                        <PopOverContent
                            imageSrc="/AkaylahJones.jpg"
                            title="Akayla Jones"
                            description="University of Arkansas Clinton School of Public Service (MA) and Henderson State University (BA)"
                        />
                    </div>
                    <div className="col-4dot8">
                        <PopOverContent
                            imageSrc="/Naomi-Vickers-home.jpg"
                            title="Naomi Vickers"
                            description="Harvard University"
                        />
                    </div>
                </Row>
            </Col>
        </Row>
    );
}
