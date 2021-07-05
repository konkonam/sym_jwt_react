import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';

import AuthService from './services/auth.service';

import Count from './components/count.component';

const App: FunctionComponent = () => {
    const user = AuthService.getCurrentUser();

    return (
        <div>
            <p>hello from App</p>
            <p>{user.token}</p>
            <Count />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));