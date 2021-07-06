import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ApiService from '../services/api.service';

import { Row, Col, Card, message, Spin } from 'antd';
import ErrorList from 'antd/lib/form/ErrorList';



const Product = (props: any) => {
    return (
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Card title={props.name}>
                <p>id: {props.id}</p>
                <p>description: {props.description}</p>
                <p>price: {props.price}</p>
            </Card>         
        </Col>
    );
}

const ProductsList = () => {
    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if(isLoading) {
            ApiService.getProducts()
                .then( response => {
                    setProducts(response.data);
                })
                .catch(
                    error => {
                        if(error.response.status === 401) {
                            message.error('Access denied!', 3);
                            history.push('/');
                        } else {
                            history.push('/error/' + error.response.status);
                        }
                    }
                )
                .finally(() => setLoading(false));
        }
    });

    return products.length ? (
        <Row gutter={[8, 8]}>
            {products.map(product => (
                <Product
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                />
            ))}
        </Row>
    ) : (
    <p><Spin size="large" /> loading...</p>
    );
}

export default ProductsList;