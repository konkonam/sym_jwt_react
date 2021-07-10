import React from 'react';
import { history } from '../constants';
import authentication from '../services/auth.service';
import { Form, Input, Button, message } from 'antd';

const RegisterForm = () => {
    const onFinish = (values: any) => {
        authentication.register(values.email, values.password).then(() => {
            message.success('Welcome ' + values.email);
            history.push('/products');
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        message.error('Could not register!');
    };

    return (
        <Form name='registerForm' layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>

            <legend>Register</legend>

            <Form.Item label='E-Mail' name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
            </Form.Item>

            <Form.Item label='Prename' name='prename'>
                <Input />
            </Form.Item>

            <Form.Item label='Surname' name='surname'>
                <Input />
            </Form.Item>

            <Form.Item label='City' name='city'>
                <Input />
            </Form.Item>

            <Form.Item label='Postal Code' name='postalCode'>
                <Input />
            </Form.Item>

            <Form.Item label='Address' name='address'>
                <Input />
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType='submit' className='center-block'>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default RegisterForm;