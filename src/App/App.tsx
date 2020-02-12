import React from 'react';
import { Button } from 'semantic-ui-react';
import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <h2 className={styles.app}>
      <Button>Click</Button>
    </h2>
  );
};

export default App;
