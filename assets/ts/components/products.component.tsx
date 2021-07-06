import React, { useState, useEffect } from 'react';

import ApiService from '../services/api.service';

const Product = (props: any) => {
    <div>
        id: {props.id}<br/>
        name: {props.name}
    </div>
}

const ProductsList = () => {
    const [content, setContent] = useState();

    useEffect(() => {
        ApiService.getProducts()
            .then( response => {
                setContent(response.data);
            }, null);
    });
    


    return (
        <div>
            {content}
        </div>
    );
}

export default ProductsList;