import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as routes from '../Routes';
import Home from '../pages/Home';
import About from '../pages/About';
import FAQ from '../pages/FAQ';
import ScrollToTop from './ScrollToTop';
import styles from './Routes.module.scss';

const Routes: React.FC = () => {
  return (
    <div className={styles.rootBody}>
      <ScrollToTop />
      <Switch>
        <Route path={routes.ABOUT}>
          <About />
        </Route>
        <Route path={routes.FAQ}>
          <FAQ />
        </Route>
        <Route exact path={routes.HOME}>
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
