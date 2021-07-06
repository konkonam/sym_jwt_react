import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Row, Col, Card } from 'antd';

// makes regenerateRuntime a global, need to find a better solution later on
import 'regenerator-runtime/runtime'

import Header from './components/header.component';

import LoginForm from './components/loginform.component';
import ProductsList from './components/productslist.component';

import Error from './components/error.component';

const App = () => {
    return (
        <Router>
            <Header />

            <div className='container'>
                <Switch>
                    <Route exact path="/" component={LoginForm}/>
                    <Route exact path="/products"  component={ProductsList}/>
                    <Route exact path="/error/:id" component={Error} />
                </Switch>
            </div>
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));