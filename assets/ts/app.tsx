import React, {FunctionComponent} from 'react';
import ReactDOM from 'react-dom';

const App: FunctionComponent = () => {
    return (
        <p>hello from Counter1</p>
    );
  }

ReactDOM.render(<App />, document.getElementById('root'));