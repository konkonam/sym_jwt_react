import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Card, message, Spin } from 'antd';
import api from '../services/api.service';

const { Meta } = Card;

const ProductListElement = (props: any) => {
    const history = useHistory();

    const handleClick = () => {
        history.push('/product/' + props.id);
    }

    return (
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Card cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>} hoverable onClick={handleClick}>
            <Meta title={props.name} description={props.description}/>
                <p>{props.price}$</p>
            </Card>         
        </Col>
    );
}

const Products = () => {
    const [ isLoading, setLoading ] = useState(true);
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        if(isLoading) {
            api.get('products').then( response => {
                    setProducts(response.data);
                }).finally(() => setLoading(false));
        }
    });

    return products.length ? (
        <Row gutter={[8, 8]}>
            {products.map(product => (
                <ProductListElement
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                />
            ))}
        </Row>
    ) : (
    <p><Spin size="large" />loading...</p>
    );
}

export default Products;