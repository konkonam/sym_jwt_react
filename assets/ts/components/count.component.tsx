import React, { FunctionComponent } from 'react';

const Count: FunctionComponent = () => {
    const [count, setCount] = React.useState(0);
   
    return (
        <div>
            <p>count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Click</button>
        </div>
    );
};

export default Count;