import React from 'react';
import { useHistory } from "react-router";
import authentication from '../services/auth.service';
import { Form, Input, Button, Checkbox, message } from 'antd';

const LoginForm = () => {
    const history = useHistory();

    const onFinish = (values: any) => {
        authentication.login(values.email, values.password).then(() => {
            message.success('Welcome ' + values.email);
            history.push('/products');
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        message.error('Could not login!');
    };

  return (
    <Form
      name="loginForm"
      layout='vertical'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="E-Mail"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
