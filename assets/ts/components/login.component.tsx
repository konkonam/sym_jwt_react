import React from 'react';
import { history } from '../constants';
import authentication from '../services/auth.service';
import { Form, Input, Button, Checkbox, message } from 'antd';

const LoginForm = () => {
    const onFinish = (values: any) => {
        authentication.login(values.email, values.password).then(() => {
            message.success('Welcome ' + values.email);
            history.push('/products');
        }).catch(error => {
          message.error('Could not login!');
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        message.error('Could not login!');
    };

  return (
    <Form name='loginForm' layout='vertical' initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>

      <legend>Login</legend>

      <Form.Item label='E-Mail' name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='center-block'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
