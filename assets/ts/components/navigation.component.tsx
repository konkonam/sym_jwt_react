import React from "react";
import { Link } from "react-router-dom";
import { Menu, Button, message } from 'antd';

const Navigation = () => {
    return (
        <Menu mode="horizontal">
            <Menu.Item key="men">
                <Link to='/products'>For Him</Link>
            </Menu.Item>
            <Menu.Item key="women">
                <Link to='/products'>For Her</Link>
            </Menu.Item>
            <Menu.Item key="kids">
                <Link to='/products'>For Kids</Link>
            </Menu.Item>
        </Menu>
    );
}

export default Navigation;