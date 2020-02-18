import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Responsive, Menu } from 'semantic-ui-react';
import getWidth from '../../utils/getWidth';
import ActiveNavContext from '../../context/ActiveNavContext/activeNavContext';
import * as routes from '../../Routes';
import Search from '../Search';
import styles from './NavBar.module.scss';
import LoginModal from '../Auth/Login';
import ContainerWrapper from '../Container';

export interface Props {
  children: React.ReactNode;
}

const DesktopLoggedOutNavBar: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const { activeItem, handleItemClick } = useContext(ActiveNavContext);
  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      <Menu fixed="top" secondary className={styles.menu}>
        <ContainerWrapper>
          <Menu.Item>
            <Menu.Item as={Link} to={routes.HOME} className={styles.menuItem}>
              <span className={styles.logoText}>HabaHaba</span>
            </Menu.Item>
          </Menu.Item>
          <Menu.Item>
            <Search />
          </Menu.Item>
          <Menu.Item position="right">
            <Menu.Item
              as={Link}
              to={routes.FAQ}
              name="faq"
              className={
                activeItem === 'faq'
                  ? `${styles.menuItem} ${styles.menuItemItem} ${styles.active}`
                  : `${styles.menuItem} ${styles.menuItemItem}`
              }
              onClick={handleItemClick}
            >
              FAQ
            </Menu.Item>

            <Menu.Item className={styles.menuItem}>
              <LoginModal />
            </Menu.Item>
          </Menu.Item>
        </ContainerWrapper>
      </Menu>

      <div style={{ marginTop: '67px' }}>{children}</div>
    </Responsive>
  );
};

export default DesktopLoggedOutNavBar;
