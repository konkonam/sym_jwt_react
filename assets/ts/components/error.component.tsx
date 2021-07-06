import React from 'react';
import { useHistory, useParams } from 'react-router-dom'

const Error = () => {
    const { id }: any = useParams();
   
    return (
        <div>
            <h1>Error: {id}</h1>
        </div>
    );
};

export default Error;