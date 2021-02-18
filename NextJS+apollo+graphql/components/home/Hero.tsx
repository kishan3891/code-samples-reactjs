import { Row, Col, Typography } from 'antd';
import MailChimp from '@components/common/MailChimp';

const { Title } = Typography;

export default function Hero() {
    return (
        <div className="hero__wrapper">
            <div className="container">
                <div className="hero__wrapper__content center">
                    <Row>
                        <Col span={24}>
                            <Title level={1}>Unapologetically Black Education</Title>
                            <p>Personal, world-class education at home</p>
                            <MailChimp labelTitle={`Subscribe for Updates`} btnLabel="Sign up" iid="email" />
                        </Col>
                    </Row>
                </div>
                <div className="hero__image__outer__bg">
                    <picture >
                        <source media="(max-width: 574px)" srcSet="/hero-mobile-blog.png"/>
                        <source media="(min-width: 575px)" srcSet="/hero-bg.png"/>
                        <img alt="Unapologetically Black Education" src="/hero-bg.png"/>
                    </picture>
                </div>
                <div className="hero__image__wrapper">
                    <picture >
                        <source media="(max-width: 574px)" srcSet="/hero-image-mobile-new.png"/>
                        <source media="(min-width: 575px)" srcSet="/hero-image.png"/>
                        <img alt="Unapologetically Black Education" src="/hero-image.png"/>
                    </picture>
                </div>
            </div>
        </div>
    );
}
