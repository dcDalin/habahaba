import React from 'react';
import { BrowserRouter as Route } from 'react-router-dom';
import Routes from './Routes';

const App: React.FC = () => {
  return (
    <Route>
      <Routes />
    </Route>
  );
};

export default App;
