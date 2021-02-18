import { Row, Col, Typography } from 'antd';
import ActiveLink from '@components/common/activeLink';
import useAuth, { handleLogout } from '../../hooks/useAuth';
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

const { Title } = Typography;

export default function AccountHeader() {
    const [sticky, setSticky] = useState(false);
    const { user } = useAuth();
    const ref = React.useRef<HTMLInputElement>(null);

    useEffect(function mount() {
        function onScroll() {
            const headerHeight = document.getElementById('header').clientHeight;
            if (window.scrollY + headerHeight >= ref.current.offsetTop) setSticky(true);
            else setSticky(false);
        }
        window.addEventListener('scroll', onScroll);
        return function unMount() {
            window.removeEventListener('scroll', onScroll);
        };
    });

    return (
        <>
            <div className="hero__wrapper hero__wrapper__inner account__hero__wrapper">
                <div className="account__header">
                    <div className="container">
                        <Row align="bottom">
                            <Col sm={18} xs={24}>
                                <Title level={2}>
                                    {user?.firstName} {user?.lastName}
                                </Title>
                                <strong>
                                    {user?.grade.name}, {user?.school.name}
                                </strong>
                            </Col>
                            <Col sm={6} xs={24} className="logout__wrapper">
                                <button onClick={handleLogout} className="button-primary">
                                    Log Out
                                </button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <div className={classnames('account__tab', sticky && 'sticky')} ref={ref}>
                <div className="divider"></div>
                <div className="container">
                    <Row>
                        <Col span={24}>
                            <ul>
                                <li>
                                    <ActiveLink children={`My Schedule`} href="/account/schedule" className={null} />
                                </li>
                                <li>
                                    <ActiveLink children={`My Courses`} href="/account/courses" className={null} />
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}
