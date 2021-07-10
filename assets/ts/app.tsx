import React from 'react';
import { Router as Router, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { history } from './constants';

import Header from './components/header.component';

import LoginForm from './components/login.component';
import Products from './components/products.component';

const App = () => {
  return (
    <Router history={history}>
      <Header />

      <div className='container'>
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/products" component={Products} />
          <Route exact path='/products/:id'/>
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));