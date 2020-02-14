import React from 'react';
import { Link } from 'react-router-dom';
import { Responsive, Menu } from 'semantic-ui-react';
import getWidth from '../../utils/getWidth';
import * as routes from '../../Routes';
import MobileFooterNav from './MobileFooterNav';
import LoginModal from '../Auth/Login';
import styles from './NavBar.module.scss';

export interface Props {
  children: React.ReactNode;
}

const MobileLoggedOutNavBar: React.FC<Props> = (props: Props) => {
  const { children } = props;

  return (
    <>
      <Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
        <Menu fixed="top" secondary className={styles.mobileMenu} size="huge">
          <Menu.Item as={Link} to={routes.HOME}>
            <span className={styles.logoText}>Fiklin</span>
          </Menu.Item>
          <Menu.Item position="right">
            <LoginModal />
          </Menu.Item>
        </Menu>
        <div style={{ marginTop: '48px' }}>{children}</div>
      </Responsive>
      <MobileFooterNav />
    </>
  );
};

export default MobileLoggedOutNavBar;
