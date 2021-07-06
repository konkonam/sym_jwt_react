import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

// makes regenerateRuntime a global, need to find a better solution later on
import 'regenerator-runtime/runtime'

import Header from './components/header.component';

import LoginForm from './components/login.component';
import ProductsList from './components/products.component';

const App = () => {
    return (
        <Router>
            <Header />

            <Switch>
                <Route exact path="/" component={LoginForm}/>
                <Route exact path="/products"  component={ProductsList}/>
            </Switch>
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));