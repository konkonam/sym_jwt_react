import React, { FunctionComponent, useEffect } from 'react';
import ReactDOM from 'react-dom';

import AuthService from './services/auth.service';

import Count from './components/count.component';
import LoginForm from './components/login.component';
import ProductsList from './components/products.component';

const App: FunctionComponent = () => {
    //AuthService.logout();


    return (
        <div>

            <ProductsList />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));