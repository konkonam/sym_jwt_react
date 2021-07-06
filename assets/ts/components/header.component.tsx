import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Button, Descriptions } from 'antd';

const Header = () => {
    return (
        <div className="site-page-header-ghost-wrapper">
            <PageHeader
            ghost={false}
            title="jwt-react"
            extra={[
                <Button key="3">
                    <Link to="/">Login</Link>
                </Button>,
                <Button key="2">
                    <Link to="/products">Products</Link>
                </Button>,
            ]}
            >
            </PageHeader>
        </div>
    );
}

export default Header;