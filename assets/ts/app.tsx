import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Row, Col, Card } from 'antd';

// makes regenerateRuntime a global, need to find a better solution later on
import 'regenerator-runtime/runtime'

import Header from './components/header.component';

import LoginForm from './components/login.component';
import ProductsList from './components/products.component';

import Error from './components/error.component';

const App = () => {
    return (
        <Router>
            <Header />

            <div className='container'>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Card style={{ width: 300 }}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                        <Switch>
                            <Route exact path="/" component={LoginForm}/>
                            <Route exact path="/products"  component={ProductsList}/>
                            <Route exact path="/error/:id" component={Error} />
                        </Switch>
                    </Col>
                </Row>
            </div>
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));