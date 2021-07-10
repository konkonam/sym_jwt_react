import React from 'react';
import { Row, Col, Typography, Space } from 'antd';

import RegisterForm from '../components/register.component';

const { Title } = Typography;

const RegisterPage = () => {
    return (
        <Row>
            <Col span={12}>
                <Space>
                    <RegisterForm />
                </Space>
            </Col>
            <Col span={12}>
                <Title>Join now and get exclusive member benefits!</Title>
            </Col>
        </Row>
    );
}

export default RegisterPage;