import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Button } from 'antd';
import {CodeOutlined} from '@ant-design/icons';
import AuthService from '../services/auth.service';

const AccountControls = () => {
    const user = AuthService.getCurrentUser();

    if (user && user.email) {
        return (
            <>
                <Button>
                    <Link to="/profile">Profile</Link>
                </Button>
                <Button>
                    <a href='#' onClick={AuthService.logout}>Logout</a>
                </Button>
            </>
        );
    } else {
        return (
            <Button>
                <Link to="/">Login</Link>
            </Button>
        );
    }
}

const Header = () => {
    const user = AuthService.getCurrentUser();

    return (
            <PageHeader
                className='site-page-header'
                subTitle='a symfony-react-app'
                ghost={false}
                title='SYMREACT'
                extra={[
                    <AccountControls />,
                    <Button>
                        <Link to="/products">Products</Link>
                    </Button>,
                ]}
            >
            </PageHeader>
    );
}

export default Header;