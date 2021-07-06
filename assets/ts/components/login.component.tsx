import React, {useState} from 'react';

import AuthService from '../services/auth.service';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (event: any) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event: any) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        AuthService.login(username, password).then(() => {
            console.log(AuthService.getCurrentUser());
        }, () => {
            console.log('something went wrong!');
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>E-Mail</label>
                <input onChange={handleUsername} type='text'/>
            </div>
            <div>
                <label>Password</label>
                <input onChange={handlePassword} type='password'/>
            </div>
            <div>
                <button type='submit'>Submit</button>
            </div>
        </form>
    );
}

export default LoginForm;