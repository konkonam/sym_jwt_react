import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';

import AuthService from '../services/auth.service';

import { Input, Space, Button, message } from 'antd';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleUsername = (event: any) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event: any) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        AuthService.login(username, password).then(() => {
            message.success('Welcome ' + username + '!', 3);
            history.push('/products');
        }, () => {
            console.log('something went wrong!');
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <legend>Please Login!</legend>
            <Space direction='vertical'>
                <Input placeholder='Email' onChange={handleUsername}/>
                <Input.Password placeholder='Password'onChange={handlePassword}/>
                <Button type='primary' htmlType='submit'>Submit</Button>
            </Space>
        </form>
    );
}

export default LoginForm;