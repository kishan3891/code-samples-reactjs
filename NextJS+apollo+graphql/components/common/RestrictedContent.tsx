import { Alert, Row, Col } from 'antd';

export default function RestrictedContent() {
    return (
        <div className="container">
            <Row>
                <Col span={24} style={{marginTop: 195, marginBottom: 100}}>
                    <div style={{margin: '0 auto', maxWidth: 600}}>
                        <Alert message="Please login to gain access!" type="error" />
                    </div>
                </Col>
            </Row>
        </div>
    );
}
