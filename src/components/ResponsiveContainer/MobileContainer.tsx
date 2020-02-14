import React, { useContext, useEffect } from 'react';
import MobileLoggedInNavBar from '../NavBar/MobileLoggedInNavBar';
import MobileLoggedOutNavBar from '../NavBar/MobileLoggedOutNavBar';
import AuthContext from '../../context/AuthContext/authContext';

const DesktopContainer: React.FC = props => {
  const { children } = props;
  const { isAuthenticated, loadUser } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
  }, []);
  let menuBar;
  if (isAuthenticated) {
    menuBar = <MobileLoggedInNavBar>{children}</MobileLoggedInNavBar>;
  } else {
    menuBar = <MobileLoggedOutNavBar>{children}</MobileLoggedOutNavBar>;
  }

  return menuBar;
};

export default DesktopContainer;
