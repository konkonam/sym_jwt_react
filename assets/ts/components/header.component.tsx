import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Button } from 'antd';

import authentication from '../services/auth.service';

const Controls = () => {
    const email = localStorage.getItem('email');

    const handleLogout = () => {
        authentication.logout();
    }

    return email ? (
        <>
            <Button type='primary'>
                <Link to='/login'>Login</Link>
            </Button>
        </>
    ) : (
        <>
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
        />
    );
}

export default Header;