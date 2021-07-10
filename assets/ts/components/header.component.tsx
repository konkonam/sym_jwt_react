import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Menu, Button, message } from 'antd';

import authentication from '../services/auth.service';
import Navigation from './navigation.component';

const Controls = () => {
    const [ isAuthenticated, setAuthenticated ] = useState(false);
    const email = localStorage.getItem('email');

    const handleLogout = () => {
        authentication.logout();
        message.error('Bye!');
    }

    return email ? (
        <>
            <Button type='primary'>
                <Link to='/products'>Products</Link>
            </Button>
            <Button type='primary'>
                <Link to='/login'>Login</Link>
            </Button>
            <Button type='primary'>
                <Link to='/register'>Register</Link>
            </Button>
            <Button type='primary' onClick={handleLogout} danger>Logout</Button>
        </>
    ) : (
        <>
            <Button type='primary'>
                <Link to='/products'>Products</Link>
            </Button>
            <Button type='primary'>
                <Link to='/login'>Login</Link>
            </Button>
            <Button type='primary'>
                <Link to='/register'>Register</Link>
            </Button>
            <Button type='primary' onClick={handleLogout} danger>Logout</Button>
        </>
    );
}

/**
 * Header is  not refreshing after login fixpls men
 */
const Header = () => {
    return (
        <PageHeader
            className="site-page-header"
            title="Reactstore"
            subTitle="a minimalistic store"
            avatar={{ src: 'http://localhost:8000/static/logo.png' }}
            extra={[<Controls />]}
        >

            <Navigation/>

        </PageHeader>
    );
}

export default Header;