import Title from "antd/lib/typography/Title";
import { Row, Col } from "antd";

export default function Hero() {
    return (
        <div className="admin_hero__wrapper">
            <div className="login__box">
                <a className="scrolled-logo" aria-label="Reconstruction">
                    <img src="/scrolled-logo.svg" alt="Reconstruction" aria-hidden="true" />
                </a>
                <Row align="middle">
                    <form>
                        <Col md={24} sm={24} xs={24}>
                            <Title level={4}>Log in</Title>
                        </Col>
                        <Col md={24} sm={24} xs={24}>
                            <div className="inputWrapper">
                                <label>Username</label>
                                <input
                                    required={true}
                                    type="email"
                                    placeholder="Enter username"
                                />
                            </div>
                            <div className="inputWrapper">
                                <label>Password</label>
                                <input
                                    required={true}
                                    type="password"
                                    placeholder="Enter password"
                                />
                            </div>
                        </Col>
                        <Col md={24} sm={24} xs={24} className="login__footer">
                            <a href='' target='_blank'>Forgot Password ?</a>
                            <button type="submit" className="button-secondary">Log in</button>
                        </Col>
                    </form>
                </Row>
            </div>
        </div>
    );
}
