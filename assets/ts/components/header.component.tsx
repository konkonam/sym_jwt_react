import React from 'react';
import { Link } from 'react-router-dom';

import { PageHeader, Button } from 'antd';

const Controls = () => {
    const email = localStorage.getItem('email');

    return email ? (
        <>
            <Link to='/logout'>logout</Link>
        </>
    ) : (
        <>
            <Link to='/login'>login</Link>
        </>
    );
}

const Header = () => {
    return (
        <PageHeader
            className="site-page-header"
            onBack={() => null}
            title="Store"
            subTitle="a minimalistic store"
            extra={[<Controls />]}
        />
    );
}

export default Header;