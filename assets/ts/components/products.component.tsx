import React, { useState, useEffect } from 'react';
import api from '../services/api.service';

const Products = () => {
    const [isLoading, setLoading] = useState(true);
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        if(isLoading) {
            api.get('products').then(response => {
                setProducts(response.data);
            }).finally(() => setLoading(false));
        }
    });

    return products.length ? (
            <p>Products found</p>
    ) : (
    <p>loading...</p>
    );
}

export default Products;