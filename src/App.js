import React from 'react';
import Dashboard from './components/dashboard'
import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <React.Fragment>
      <Router>
        <Dashboard/>
      </Router>
    </React.Fragment>
  );
}

export default App;
