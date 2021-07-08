import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" />
        <Route exact path="/register" />
        <Route exact path="/login" />
        <Route exact path="/logout" />
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));