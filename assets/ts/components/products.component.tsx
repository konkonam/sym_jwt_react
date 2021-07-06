import React, { useState, useEffect } from 'react';

import ApiService from '../services/api.service';

const Product = (props: any) => {
    return (
        <li>
            id: {props.id}<br/>
            name: {props.name}<br/>
            description: {props.description}<br/>
            price: {props.price}
        </li>
    );
}

const ProductsList = () => {
    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if(isLoading) {
            ApiService.getProducts()
                .then( response => {
                    setProducts(response.data);
                })
                .catch(
                    error => console.error(`Error: ${error}`)
                )
                .finally(() => setLoading(false));
        }
    });

    return products.length ? (
        <ul>
            {products.map(product => (
                <Product
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                />
            ))}
        </ul>
    ) : (
    <p>loading...</p>
    );
}

export default ProductsList;