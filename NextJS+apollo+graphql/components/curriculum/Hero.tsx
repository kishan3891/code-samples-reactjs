import { Row, Col, Typography } from 'antd'
import * as Scroll from "react-scroll";

const { Title } = Typography
let Link = Scroll.Link;

interface Props {
    pageTitle: string;
    description: string;
    image: string;
}

export default function Hero({ pageTitle, description, image }: Props) {
    return (
        <div className="hero__wrapper hero__wrapper__inner hero__wrapper__curriculum">
            <div className="container">
                <Row align='middle'>
                    <Col
                        md={10}
                        sm={24}
                        xs={24}
                        className="hero__curriculum__left"
                    >
                        <Title level={1}>{pageTitle}</Title>
                        <p>{description}</p>
                        <Link
                            to="classSchedule"
                            spy={true}
                            smooth={true}
                            offset={-150}
                            duration={500}
                            className="button-primary-xl with-arrow-bottom"
                        >
                            Get Educated
                            <img alt={pageTitle} src="/down-arrow.svg" />
                        </Link>
                    </Col>
                    <Col
                        md={14}
                        sm={24}
                        xs={24}
                        className="hero__curriculum__right"
                    >
                        <img alt={pageTitle} src={image} />
                    </Col>
                </Row>
            </div>
        </div>
    );
}
